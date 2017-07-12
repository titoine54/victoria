import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserSettings } from "app/classes/user-settings";
import { environment } from '../../environments/environment';
import { MockUser } from "app/services/api-mocking-tests/user.mock";
import { MockEvaluations } from "app/services/api-mocking-tests/evaluations.mock";
import { MockApList } from "app/services/api-mocking-tests/ap-list.mock";
import { MockStats } from "app/services/api-mocking-tests/stats.mock";

@Injectable()
export class ApiService {

  /** This class will be used to make all the requests with the backend */
  constructor(private http: Http) { }

  /** Generate the valid headers for all API calls
   * @return {Headers} The headers
   */
  private getHeaders(token?: String, noToken?: boolean) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");
    return new RequestOptions({ headers: headers, withCredentials: true });
  }

  /** Fetch all the user data from the server
   *  Which is: User, UserConfiguration, etc.
   * @return {Observable} The observable for the caller
   */
  public getUserData(): Observable<any> {
    if (environment.production == false && environment.useOfflineMocks) {
      return Observable.of(MockUser);
    }
    return this.http.get(`${environment.apiUrl}/user`, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /** Fetch all note of the user for the user
   *  Which is: Evaluations, Aps, Notifications Settings, etc.
   * @param {string} trimestre The trimestre to fetch
   * @return {Observable} The observable for the caller
   */
  public getNotes(trimestre?: string): Observable<any> {
    if (environment.production == false && environment.useOfflineMocks) {
      return Observable.of({ "aps": MockApList, "evaluations": MockEvaluations });
    }

    var url = `${environment.apiUrl}/v2/notes`;
    if (trimestre) { url += `?trimestre=${trimestre}` }

    return this.http.get(url, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

  /** Collect stats for "moyenne" and "ecart-type" of each evaluations
   * @param {string} trimestre The trimestre to fetch
   * @return {Observable} The observable for the caller
   */
  public getStats(trimestre?: string): Observable<any> {
    if (environment.production == false && environment.useOfflineMocks) {
      return Observable.of({ "statistiques": MockStats });
    }

    var url = `${environment.apiUrl}/v2/statistiques`;
    if (trimestre) { url += `?trimestre=${trimestre}` }

    return this.http.get(url, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

  /** Allow user to modify it's application settings
   * @param {UserSettings} userSettings The settings of the user
   * @return {Observable} The observable for the caller
   */
  public saveUserSettings(userSettings: UserSettings): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user`, JSON.stringify(userSettings), this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

  /** Warn api that the user has viewed a notification
   * @param {number} notificationId The id of the notification to mark as read
   * @return {Observable} The observable for the caller
   */
  public markEvaluationAsRead(notificationId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notify/${notificationId}`, this.getHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error._body || 'Server error'));
  }

}
