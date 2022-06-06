import InputLg from "../InputLg";
import InputSm from "../InputSm";
import Button from "../Button";
import { resolveSOLDomain } from "../../utils/resolveSOLDomain";
import { validateSolanaAddress } from "../../utils/validateSolanaAddress";

type Fields = {
    to: string;
    message: string;
}

type WriteProps = {
    fields: Fields;
    handleChange: (e: any) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function Write({ fields, handleChange, nextStep, prevStep }:WriteProps) {

    const handleSubmit = () => {
        try {
            if (fields.to.includes(".sol")) {
                const resolvedDomain = resolveSOLDomain(fields.to);
                return resolvedDomain
            } else {
                return validateSolanaAddress(fields.to)
            }
        } catch (error) {
            return Error("Something ain't right")
        }
    }

    return (
        <>
            <div className="flex flex-col justify-end">
                <InputSm label="Who is it going to?" placeholder="SOL address or .sol name" name="to" value={fields.to} handleChange={handleChange} />
                <InputLg label="What do you want to say?" placeholder="Have a drink on me :-)" name="message" value={fields.message} handleChange={handleChange} />
            </div>
            <div className="flex flex-row justify-end mt-2">
                <div className={"mr-4 w-44 " + (1 < 0 ? "invisible" : "")}>
                    <Button style="default" onClick={prevStep}>
                        Previous
                    </Button>
                </div>
                <div className={"w-44 " + ((fields.to.length > 0 && fields.message.length > 0) ? "" : "invisible")}>
                    <Button style="filled" onClick={nextStep}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}