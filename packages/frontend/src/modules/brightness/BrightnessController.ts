import {CommunicationController} from "../../CommunicationController";
import {State} from "../../State";
import {Data} from "../../Data";

interface SunData {
    sunriseMinutes: number; // minutes since midnight
    sunsetMinutes: number;
}

export class BrightnessController {
    private sunData: SunData | null = null;
    private lastFetchDate: string | null = null;
    private state: State;

    constructor({communicationController, state, data}: {
        communicationController: CommunicationController,
        state: State,
        data: Data
    }) {
        this.state = state;

        this.state.brightness.addListener(value => {
            data.brightness = value;
            localStorage.setItem("data", JSON.stringify(data));
            communicationController.setBrightness(value);
        });

        this.next();
    }

    async next() {
        this.state.brightness.value = await this.getBrightness(Date.now());
        setTimeout(() => this.next(), 60 * 60 * 1000)
    }

    async getBrightness(timestampMs: number): Promise<number> {
        await this.ensureSunData();
        return this.calculateBrightness(timestampMs);
    }

    private async ensureSunData(): Promise<void> {
        const today = new Date().toDateString();
        if (this.lastFetchDate === today && this.sunData !== null) return;

        try {
            const coords = await this.getCoords();
            const data = await this.fetchSunriseSunset(coords.latitude, coords.longitude);
            const sunrise = new Date(data.results.sunrise);
            const sunset = new Date(data.results.sunset);
            this.sunData = {
                sunriseMinutes: sunrise.getHours() * 60 + sunrise.getMinutes(),
                sunsetMinutes: sunset.getHours() * 60 + sunset.getMinutes(),
            };
            this.lastFetchDate = today;
        } catch {
            // fallback: 6:00 sunrise, 20:00 sunset
            this.sunData = {sunriseMinutes: 6 * 60, sunsetMinutes: 20 * 60};
        }
    }

    private getCoords(): Promise<GeolocationCoordinates> {
        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(p => resolve(p.coords), reject, {timeout: 5000})
        );
    }

    private async fetchSunriseSunset(lat: number, lng: number) {
        const res = await fetch(
            `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
        );
        if (!res.ok) throw new Error("sunrise-sunset API error");
        return (await res.json()) as { results: { sunrise: string; sunset: string } };
    }

    calculateBrightness(timestampMs: number): number {
        const {sunriseMinutes, sunsetMinutes} = this.sunData ?? {sunriseMinutes: 6 * 60, sunsetMinutes: 20 * 60};

        const solarNoonMinutes = (sunriseMinutes + sunsetMinutes) / 2;
        const date = new Date(timestampMs);
        const currentMinutes = date.getHours() * 60 + date.getMinutes();

        // cosine curve: 100% at solar noon, 0% at midnight (12h away from noon)
        const diffMinutes = currentMinutes - solarNoonMinutes;
        const halfDayMinutes = 12 * 60;
        const angle = (diffMinutes / halfDayMinutes) * Math.PI;

        return Math.round(Math.max(0, Math.min(100, ((Math.cos(angle) + 1) / 2) * 100)));
    }
}