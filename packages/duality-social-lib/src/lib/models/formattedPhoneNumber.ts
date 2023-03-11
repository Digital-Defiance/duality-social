export class FormattedPhoneNumber 
{
    private _rawPhone: string;
    private _countryCode: number;
    private _formattedPhone: string;
    private _verified: boolean;

    constructor(phone: string) {
        this._rawPhone = phone.trim();
        this._countryCode = this.parseCountryCode();
        this._formattedPhone = this.format();
        this._verified = false;
    }

    protected parseCountryCode(): number {
        // TODO: implement
        return 1;
    }

    protected format(): string {
        // TODO: implement
        return this._rawPhone;
    }

    public get CountryCode(): string {
        return `+${this._countryCode}`;
    }

    public get Verified(): boolean {
        return this._verified;
    }
}