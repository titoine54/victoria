import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

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
    var url = `${environment.apiUrl}/notes`;
    if (trimestre) { url += `?trimestre=${trimestre}` }

    return this.http.get(url, this.getHeaders())
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
