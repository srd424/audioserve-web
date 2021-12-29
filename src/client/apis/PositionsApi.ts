/* tslint:disable */
/* eslint-disable */
/**
 * audioserve API
 * REST API for audioserve
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Position,
    PositionFromJSON,
    PositionToJSON,
} from '../models';

export interface PositionsGroupColIdPathGetRequest {
    group: string;
    colId: number;
    path: string;
    finished?: boolean;
    unfinished?: boolean;
    from?: number;
    to?: number;
    rec?: boolean;
}

export interface PositionsGroupGetRequest {
    group: string;
    finished?: boolean;
    unfinished?: boolean;
    from?: number;
    to?: number;
}

export interface PositionsGroupLastGetRequest {
    group: string;
}

export interface PositionsGroupPostRequest {
    group: string;
    position: Position | null;
}

/**
 * 
 */
export class PositionsApi extends runtime.BaseAPI {

    /**
     * Last recent position for given folder path (`path` can be empty to for root of collection,  but in this case / must be present after  `col_id`` ). If `rec` query parameter is given recursive search is done for this folder and all subfolders and list of postions is returned.
     */
    async positionsGroupColIdPathGetRaw(requestParameters: PositionsGroupColIdPathGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Position | Array<Position>>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling positionsGroupColIdPathGet.');
        }

        if (requestParameters.colId === null || requestParameters.colId === undefined) {
            throw new runtime.RequiredError('colId','Required parameter requestParameters.colId was null or undefined when calling positionsGroupColIdPathGet.');
        }

        if (requestParameters.path === null || requestParameters.path === undefined) {
            throw new runtime.RequiredError('path','Required parameter requestParameters.path was null or undefined when calling positionsGroupColIdPathGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.finished !== undefined) {
            queryParameters['finished'] = requestParameters.finished;
        }

        if (requestParameters.unfinished !== undefined) {
            queryParameters['unfinished'] = requestParameters.unfinished;
        }

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.rec !== undefined) {
            queryParameters['rec'] = requestParameters.rec;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/positions/{group}/{col_id}/{path}`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))).replace(`{${"col_id"}}`, encodeURIComponent(String(requestParameters.colId))).replace(`{${"path"}}`, encodeURIComponent(String(requestParameters.path))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => Position | Array&lt;Position&gt;FromJSON(jsonValue));
    }

    /**
     * Last recent position for given folder path (`path` can be empty to for root of collection,  but in this case / must be present after  `col_id`` ). If `rec` query parameter is given recursive search is done for this folder and all subfolders and list of postions is returned.
     */
    async positionsGroupColIdPathGet(requestParameters: PositionsGroupColIdPathGetRequest, initOverrides?: RequestInit): Promise<Position | Array<Position>> {
        const response = await this.positionsGroupColIdPathGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get recent positions for the group
     */
    async positionsGroupGetRaw(requestParameters: PositionsGroupGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<Position>>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling positionsGroupGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.finished !== undefined) {
            queryParameters['finished'] = requestParameters.finished;
        }

        if (requestParameters.unfinished !== undefined) {
            queryParameters['unfinished'] = requestParameters.unfinished;
        }

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/positions/{group}`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PositionFromJSON));
    }

    /**
     * Get recent positions for the group
     */
    async positionsGroupGet(requestParameters: PositionsGroupGetRequest, initOverrides?: RequestInit): Promise<Array<Position>> {
        const response = await this.positionsGroupGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Last recent position for this group
     */
    async positionsGroupLastGetRaw(requestParameters: PositionsGroupLastGetRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Position>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling positionsGroupLastGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/positions/{group}/last`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PositionFromJSON(jsonValue));
    }

    /**
     * Last recent position for this group
     */
    async positionsGroupLastGet(requestParameters: PositionsGroupLastGetRequest, initOverrides?: RequestInit): Promise<Position> {
        const response = await this.positionsGroupLastGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Updates recent position for given group
     */
    async positionsGroupPostRaw(requestParameters: PositionsGroupPostRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.group === null || requestParameters.group === undefined) {
            throw new runtime.RequiredError('group','Required parameter requestParameters.group was null or undefined when calling positionsGroupPost.');
        }

        if (requestParameters.position === null || requestParameters.position === undefined) {
            throw new runtime.RequiredError('position','Required parameter requestParameters.position was null or undefined when calling positionsGroupPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/positions/{group}`.replace(`{${"group"}}`, encodeURIComponent(String(requestParameters.group))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PositionToJSON(requestParameters.position),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates recent position for given group
     */
    async positionsGroupPost(requestParameters: PositionsGroupPostRequest, initOverrides?: RequestInit): Promise<void> {
        await this.positionsGroupPostRaw(requestParameters, initOverrides);
    }

}
