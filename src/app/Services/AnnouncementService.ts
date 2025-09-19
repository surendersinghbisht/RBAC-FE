import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Announcement {
    title: string;
    message: string;
    createdBy: string;
    createdAt?: Date;
}
@Injectable({
  providedIn: 'root'
})
export class AddAnnouncementService {
private baseUrl = 'https://localhost:7069/api/Announcement';  
    constructor(private http: HttpClient) { 
        
    }

    createAnnouncement(announcement: Announcement[]):Observable<any> {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        const createdAt = new Date();
        announcement = announcement.map(a => ({
          ...a, createdBy: userId,
          createdAt
        }))
        console.log('ann-service',announcement)
        return this.http.post(`${this.baseUrl}/add-announcement`, announcement);
      }

      getAnnouncements(): Observable<Announcement[]> {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        return this.http.get<Announcement[]>(`${this.baseUrl}/get-announcements/${userId}`);
      }

      deleteAnnouncement(announcementId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/delete-announcement/${announcementId}`);
      } 

      editAnnouncement(updatedAnnouncement: any): Observable<any> {
        let data = {
          announcementId : updatedAnnouncement.announcementId,
          title: updatedAnnouncement.title,
          message: updatedAnnouncement.message,
        }
        return this.http.put(`${this.baseUrl}/edit-announcement`, data);
      }

      GetAllAnnouncementsForUser(): Observable<any> {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        return this.http.get(`${this.baseUrl}/all-announcemets-forusers/${userId}`);
      }

      markAsRead(): Observable<any> {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        console.log('mark as read userId', userId);
        return this.http.post(`${this.baseUrl}/markAsRead`, {userId});
      }
}

// https://localhost:7069/api/Announcement/add-announcement