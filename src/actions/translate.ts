'use server';

import { FormState } from "@/components/TranslatorForm";
import { addOrUpdateUser } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { v4 } from "uuid";

const location = process?.env?.NEXT_PUBLIC_AZURE_TEXT_LOCATION
const endpoint = process?.env?.NEXT_PUBLIC_AZURE_TEXT_TRANSLATION
const key  = process?.env?.NEXT_PUBLIC_AZURE_TEXT_TRANSLATION_KEY

export async function translate(prevState: FormState,formData: FormData) {
	auth().protect();
	const { userId } = auth();
	if(!userId) throw new Error("User not found");

	
	
	const rawFormData = {
		inputLang: formData.get('inputLang') as string,
		input: formData.get('input') as string,
		outputLang: formData.get('outputLang') as string,
		output: formData.get('output') as string,
	}
	const response = await axios({
		baseURL: endpoint,
		url: 'translate',
		method: 'POST',
		headers: {
			"Ocp-Apim-Subscription-Key": key!,
			"Ocp-Apim-Subscription-Region": location!,
			"Content-type": "application/json",
			"X-ClientTraceId": v4().toString(),
		},
		params: {
			"api-version": "3.0",
			from: rawFormData.inputLang === "auto" ? null : rawFormData.inputLang,
			to: rawFormData.outputLang,
		},
		data: [{
			text: rawFormData?.input
		}],
		responseType: 'json'
	})

	const data = response.data;
	if(data?.error){
		console.log(data.error)
	}

	if(rawFormData?.inputLang ==="auto"){
		rawFormData.inputLang = data[0]?.detectedLanguage?.language;
	}

	try {
		const translation = {
			from: rawFormData?.inputLang,
			fromText: rawFormData?.input,
			to: rawFormData?.outputLang,
			toText: data?.[0]?.translations?.[0]?.text as string,
		}
		addOrUpdateUser(userId, translation);
	} catch (error) {
		
	}

	revalidateTag('translationHistory')
	console.log(prevState, rawFormData)
	return {
		...rawFormData,
		output: data?.[0]?.translations?.[0]?.text,
	}
	
}