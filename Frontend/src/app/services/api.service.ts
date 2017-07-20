import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { MockUser } from "app/services/api-mocking-tests/user.mock";
import { MockEvaluations } from "app/services/api-mocking-tests/evaluations.mock";
import { MockApList } from "app/services/api-mocking-tests/ap-list.mock";
import { MockStats } from "app/services/api-mocking-tests/stats.mock";
import { MockNouvelles } from "app/services/api-mocking-tests/nouvelles.mock";

@Injectable()
export class ApiService {

  /** This class will be used to make all the requests with the backend */
  constructor(private http: Http) { }

  /** Generate the valid headers and query string for all API calls
   * @return {RequestOptions} The RequestOptions
   */
  private getRequestOptions(searchParams?: URLSearchParams) {
    let headers: Headers = new Headers();
    headers.append("Content-Type", "application/json");

    let params = new URLSearchParams(window.location.search.substr(1));
    if(searchParams) { params.appendAll(searchParams); }

    return new RequestOptions({ params: params, headers: headers, withCredentials: true });
  }

  private handleError(error: any) {
    if (error.status == 401) {
      window.location.replace("https://cas.usherbrooke.ca/login?service=" + window.location.protocol + "//" + window.location.host);
      return Observable.empty();
    } else {
      return Observable.throw(error || 'Server error');
    }
  }

  /** Fetch all the user data from the server
   *  Which is: User, UserConfiguration, etc.
   * @return {Observable} The observable for the caller
   */
  public getUserData(): Observable<any> {
    if (environment.production == false && environment.useOfflineMocks) {
      return Observable.of(MockUser);
    }

    return this.http.get(`${environment.apiUrl}/user`, this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /** Fetch all note of the user for the user
   *  Which is: Evaluations, Aps, Notifications Settings, etc.
   * @param {string} trimestre The trimestre to fetch
   * @return {Observable} The observable for the caller
   */
  public getNotes(trimestre?: string): Observable<any> {
    if (environment.production == false && environment.useOfflineMocks) {
      return Observable.of({ "aps": MockApList, "evaluations": MockEvaluations, "notifications": MockNouvelles });
    }

    var url = `${environment.apiUrl}/v2/notes`;

    return this.http.get(url, this.getRequestOptions(trimestre? new URLSearchParams(`trimestre=${trimestre}`) : null))
      .map((res: Response) => res.json())
      .catch(this.handleError);
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

    return this.http.get(url, this.getRequestOptions(trimestre? new URLSearchParams(`trimestre=${trimestre}`) : null))
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /** Warn api that the user has viewed a notification
   * @param {number} notificationId The id of the notification to mark as read
   * @return {Observable} The observable for the caller
   */
  public markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notification/${notificationId}`, this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

}
