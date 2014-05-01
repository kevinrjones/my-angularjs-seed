describe("RSK.Timesheet.Controllers", function () {

    it("is defined", function () {
        expect(RSK.Timesheet.Controllers).toBeDefined();
    });

    describe("Index Contro ller", function () {
        it("is defined", function () {
            expect(RSK.Timesheet.Controllers.IndexCtrl).toBeDefined();
        });
    });
});

describe("RSK.Directives.Authenticate", function () {
    it("is defined", function () {
        expect(RSK.Directives.Authenticate).toBeDefined();
    });

    describe("Authenticate Controller", function () {
        var localize = {};
        var scope = {};
        var location = {};
        var authenticate = {};

        beforeEach(function() {
            localize = {
                getLocalizedString: function(){}
        };
            scope = {};
            location = {};
            authenticate = {};
        });

        afterEach(function() {
        });

        it("is defined", function () {
            expect(RSK.Directives.Authenticate.AuthenticateCtrl).toBeDefined();
        });

        it("gets the localized error message string", function(){
            localize.getLocalizedString = sinon.spy();
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            expect(localize.getLocalizedString.calledOnce);
            expect(localize.getLocalizedString.args[0][0]).toBe("UserAlreadyExists");
        });


        it("defaults isError to false", function(){
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            expect(scope.isError).toBe(false);
        });

        it("defaults isRegistering to false", function(){
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            expect(scope.isRegistering).toBe(false);
        });

        it("defaults ErrorMessage", function(){
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            expect(scope.ErrorMessage).toBe("LogonError");
        });

        it("calls isAuthenticated when checking signin", function(){
            authenticate.isAuthenticated = sinon.spy();
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            scope.isSignedIn();
            expect(authenticate.isAuthenticated.calledOnce);
        });

        it("returns the correct error message", function(){
            localize.getLocalizedString = sinon.stub().returns("Error");
            var ctrl = new RSK.Directives.Authenticate.AuthenticateCtrl(scope, location, authenticate, localize);
            expect(scope.getErrorMessage()).toBe("Error");
        });

    });

});