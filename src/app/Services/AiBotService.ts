import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../../api";

@Injectable({ providedIn: 'root' })
export class AiBotService {
    constructor(private http: HttpClient) { }

    private baseUrl = `${BASE_URL}/Gemini/generate`;

    getAiResponse(prompt: string):Observable<any>{ 
        return this.http.get<any>(`${this.baseUrl}?prompt=${prompt}`);
    }
}