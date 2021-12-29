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

import { exists, mapValues } from '../runtime';
/**
 * For chapter chunk out from big chaptered file (like .m4b) 
 * this is start and duration (in milliseconds) of chapter with the that file
 * @export
 * @interface AudioFileSection
 */
export interface AudioFileSection {
    /**
     * Start of chapter in ms
     * @type {number}
     * @memberof AudioFileSection
     */
    start?: number;
    /**
     * Duration of chapter in ms
     * @type {number}
     * @memberof AudioFileSection
     */
    duration?: number;
}

export function AudioFileSectionFromJSON(json: any): AudioFileSection {
    return AudioFileSectionFromJSONTyped(json, false);
}

export function AudioFileSectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): AudioFileSection {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'start': !exists(json, 'start') ? undefined : json['start'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
    };
}

export function AudioFileSectionToJSON(value?: AudioFileSection | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'start': value.start,
        'duration': value.duration,
    };
}

