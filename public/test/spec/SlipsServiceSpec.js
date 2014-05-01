describe("RSK.Services.Entries", function () {

    beforeEach(function () {
        module('wrapper', 'seedServices', 'ngResource');
    });

    it("is defined", function () {
        expect(RSK.Services.Entries).toBeDefined();
    });

    describe("slipsService", function () {
        var rootScope;
        var slipsService;
        var $httpBackend;

        beforeEach(inject(function ($rootScope, _$httpBackend_, _slipsService_) {
            rootScope = $rootScope;
            slipsService = _slipsService_;
            $httpBackend = _$httpBackend_;
        }));

        it("is defined", function () {
            expect(RSK.Services.Entries.slipsService).toBeDefined();
        });

        it("returns a weeks worth of data", function () {
            $httpBackend.when('GET', '/api/slips?startDate=2013-09-22').respond([
                {},
                {}
            ]);
            var data = slipsService.getSlips(new Date(2013, 08, 23));
            $httpBackend.flush();
            expect(data.length).toBe(2);
        });

        it("returns details of one timeslip", function () {
            $httpBackend.when('GET', '/api/slip/1').respond({title: 'title'});
            var data = slipsService.get(1);
            $httpBackend.flush();
            expect(data.title).toBeDefined();
        });

        it("saves a timeslip", function () {
            $httpBackend.when('GET', '/api/slip/1').respond({title: 'old title', id: 1});
            $httpBackend.expect('PUT', '/api/slip/1', {title: 'new title'}).respond();
            slipsService.save({id: 1, title: 'new title'});
            $httpBackend.flush();
        });

        it("deletes a timeslip", function () {
            $httpBackend.when('GET', '/api/slip/1').respond({title: 'new title', id: 1});
            $httpBackend.expect('DELETE', '/api/slip/1').respond();
            slipsService.delete({id: 1, title: 'new title'});
            $httpBackend.flush();
        });

        it("creates a timeslip", function () {
            $httpBackend.expect('POST', '/api/slip', {id: 1, title: 'new title'}).respond();
            slipsService.create({id: 1, title: 'new title'});
            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});


//    it("returns the module on start", function () {
//        var module = RSK.Timesheet.start("Timesheet", null);
//        expect(module).toBeDefined();
//    });
//
//    describe("IndexController", function () {
//        var scope, dataAccess;
//        beforeEach(function(){
//            scope = {};
//            dataAccess = {
//                get: function () {
//                    console.log("get");
//                    return {
//                        success: function () {
//                            scope.posts = [{},{}]
//                        }
//                    }
//                }
//            };
//
//        });
//
//        it("returns posts", function () {
//            var ctrl = new RSK.Posts.Controllers.IndexCtrl(scope, dataAccess);
//            expect(scope.posts.length).toBe(2);
//        });
//
//    });
//
//    describe("testhttpbackend", function(){
//        var ctrl, $httpBackend;
//
//        RSK.Timesheet.start("timesheet");
//        beforeEach(module("timesheet"));
//
//        beforeEach(inject(function($rootScope, $controller, _$httpBackend_, dataAccess) {
//            scope = $rootScope.$new();
//            $httpBackend = _$httpBackend_;
//            $httpBackend.expectGET('/api/posts').respond({posts: [{},{}]});
//            ctrl = $controller(RSK.Posts.Controllers.IndexCtrl, {$scope: scope, dataAccess: dataAccess })
//        }));
//
//        it('should invoke service with right paramaeters', function() {
//            $httpBackend.flush();
//            expect(scope.posts.length).toBe(2);
//        });
//
//    });
//
//
