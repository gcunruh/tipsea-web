export const resolveGlowDomain = async ( domain: string ) =>
{
    try
    {
        let data;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-luma-client': 'glow-app-docs' }
        };

        const res = await fetch( `https://api.glow.app/glow-id/resolve?handle=${ domain }`, options );
        data = await res.json();
        return data.info.resolved;

    } catch ( error )
    {
        throw Error( "NO NO NO" );
    }

};