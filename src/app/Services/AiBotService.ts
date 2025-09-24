import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AiBotService {
    constructor(private http: HttpClient) { }

    private baseUrl = 'https://localhost:7069/api/Gemini/generate'

    getAiResponse(prompt: string):Observable<any>{ 
        return this.http.get<any>(`${this.baseUrl}?prompt=${prompt}`);
    }
}