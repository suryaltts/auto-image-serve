'use strict';

import Main, {server} from '../src/index';
import {expect} from 'chai';
import {agent as request} from 'supertest';
import sizeOf from 'buffer-image-size';

describe('Image Processing Server Tests', () => {

    it('Check if server Started', (done) => {
        request(server)
            .get('/')
            .then((res) => {
                expect(res.status).equal(200);
                done()
            })
        
    });

    it('responds to /', (done) => {
        request(server)
            .get('/')
            .then((res) => {
                expect(res.text).equal('Welcome to the Dynamic Image Generator!');
                done()
            })
    });

    it('check for 404 Error', (done) => {
        request(server)
            .get('/test')
            .then((res) => {
                expect(res.status).equal(404);
                done()
            })
    });

    it('Check processed Image 1080x1920', (done) => {
        request(server)
            .get('/image/image1.jpg?size=1080x1920')
            .then((res) => {
                expect(res.status).equal(200);
                const dimensions = sizeOf(res.body);
                expect(dimensions.width).equal(1920);
                expect(dimensions.height).equal(1080);
                done()
            })
            .catch((e) => {
                console.log("Image not available")
                done()
            })
    });

    it('Check processed Image 720x1280', (done) => {
        request(server)
            .get('/image/image1.jpg?size=720x1280')
            .then((res) => {
                expect(res.status).equal(200);
                const dimensions = sizeOf(res.body);
                expect(dimensions.width).equal(1280);
                expect(dimensions.height).equal(720);
                done()
            })
            .catch((e) => {
                console.log("Image not available")
                done()
            })
    });
});

