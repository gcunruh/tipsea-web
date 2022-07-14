import React from "react";
import InputLg from "../InputLg";
import InputSm from "../InputSm";
import Button from "../Button";
import { resolveSOLDomain } from "../../utils/resolveSOLDomain";
import { validateSolanaAddress } from "../../utils/validateSolanaAddress";
import { useState } from "react";
import { SolanaAddressValidationError, SolanaDomainError } from "../../utils/errors";
import next from "next";

type Fields = {
    to: string;
    message: string;
}

type Errors = {
    to: boolean;
    message: boolean;
}

type WriteProps = {
    fields: Fields;
    handleChange: (e: any) => void;
    errors: Errors;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    nextStep: () => void;
    prevStep: () => void;
}

export default function Write({ fields, handleChange, errors, setErrors, nextStep, prevStep }:WriteProps) {;
    const [activeErrorMessage, setActiveErrorMessage] = useState<string | null>(null);

    const handleSubmit = async () => {

        try {
            if (fields.to.includes(".sol")) {
                const resolvedDomain = await resolveSOLDomain(fields.to);
                console.log(resolvedDomain);
                nextStep();
            } else {
                const resolvedAddress =  await validateSolanaAddress(fields.to)
                console.log(resolvedAddress);
                nextStep();
            }
        } catch (error) {
            if (error instanceof SolanaAddressValidationError) {
                setErrors((data: Errors) => {
                    const updatedData = { ...data };
                    updatedData.to = true;
                    return updatedData;
                })
                setActiveErrorMessage("Invalid Solana Address!")
            } else if (error instanceof SolanaDomainError) {
                setErrors((data: Errors) => {
                    const updatedData = { ...data };
                    updatedData.to = true;
                    return updatedData;
                })
                setActiveErrorMessage("Invalid Solana Domain!")
            }
        }

    }

    return (
        <>
            <div className="flex flex-col justify-end">
                <InputSm label="Who is it going to?" placeholder="SOL address or .sol name" name="to" value={fields.to} handleChange={handleChange} error={errors.to} />
                <InputLg label="What do you want to say?" placeholder="Have a drink on me :-)" name="message" value={fields.message} handleChange={handleChange} error={fields.message.length > 150} />
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-between my-1">
                            <div className={`text-center md:text-right ${fields.message.length > 150 ? "font-semibold text-red-700" : ""}`}>
                {
                    `Message Length: ${fields.message.length}/150`
                }
            </div>
            {
                activeErrorMessage ? 
                <div className="text-red-700 font-semibold text-center md:text-left">
                    {activeErrorMessage}
                </div>
                :
                null
            }

            </div>

            <div className="flex flex-row justify-end mt-2">
                <div className={"mr-4 w-44 " + (1 < 0 ? "invisible" : "")}>
                    <Button style="default" onClick={prevStep}>
                        Previous
                    </Button>
                </div>
                <div className={"w-44 " + ((fields.to.length > 0 && (fields.message.length > 0 && fields.message.length < 151)) ? "" : "invisible")}>
                    <Button style="filled" onClick={handleSubmit}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}