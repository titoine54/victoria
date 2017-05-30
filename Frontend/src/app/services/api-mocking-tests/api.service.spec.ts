import { TestBed, async, inject } from '@angular/core/testing';
import { Response, ResponseOptions, Http, XHRBackend, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ApiService } from '../api.service';
import { MockEvaluations } from "app/services/api-mocking-tests/evaluations.mock";
import { MockApList } from "app/services/api-mocking-tests/ap-list.mock";
import { MockUser } from "app/services/api-mocking-tests/user.mock";

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ApiService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('should create the api service', inject([ApiService, XHRBackend], (service: ApiService, mockBackend: MockBackend) => {
        expect(service).toBeTruthy();
    }));

    it('should return the user data', inject([ApiService, XHRBackend], (service, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(MockUser)
            })));
        });

        return service.getUserData().subscribe(data => {
            expect(data.email).toEqual(MockUser.email);
        });
    }));
});