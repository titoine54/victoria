import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserSettings } from "app/classes/user-settings";

@Injectable()
export class ApiService {
  apiUrl: string = 'https://s6ie1704.gel.usherbrooke.ca/api';

  /** This class will be used to make all the requests with the backend */
  constructor(private http: Http) { }

  /** Generate the valid headers for all API calls
   * @return {Headers} The headers
   */
  private getHeaders(token?: String, noToken?: boolean) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    return { headers: headers };
  }

  /** Fetch all the user data from the server
   *  Which is: Evaluations, Aps, Notifications Settings, etc.
   * @return {Observable} The observable for the caller
   */
  public getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-user-data`, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

  /** Allow user to modify it's application settings
   * @param {UserSettings} userSettings The settings of the user
   * @return {Observable} The observable for the caller
   */
  public saveUserSettings(userSettings: UserSettings): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-user-settings`, JSON.stringify(userSettings), this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

  /** Warn api that the user has viewed his evaluation notes
   * @param {number} evaluationId The id of the evaluation to mark as read
   * @return {Observable} The observable for the caller
   */
  public markEvaluationAsRead(evaluationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/mark-evaluation-as-read/${evaluationId}`, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

}
