// Helper class to log and or display SampleApp messages.
// This classes sole purpose is to help developers learn about the FaceTecSDK response statuses.
var DeveloperStatusMessages = /** @class */ (function () {
    function DeveloperStatusMessages() {
    }
    var _a;
    _a = DeveloperStatusMessages;
    DeveloperStatusMessages.LOG_PREFIX = "FaceTec SampleApp:";
    // Display the message on the screen for the user
    DeveloperStatusMessages.displayMessage = function (message) {
        document.getElementById("status").innerHTML = message;
    };
    // Log the message to the console for the developer. Prefix with FaceTec SampleApp: so the messages can be filtered
    DeveloperStatusMessages.logMessage = function (message) {
        console.log("".concat(_a.LOG_PREFIX, " ").concat(message));
    };
    // Log the message and display on screen for the user
    DeveloperStatusMessages.logAndDisplayMessage = function (message) {
        _a.displayMessage(message);
        _a.logMessage(message);
    };
    // Process the FaceTecSDK.getStatus result
    DeveloperStatusMessages.logInitializeResult = function () {
        // User message to display
        var displayMessage = FaceTecStatusEnumFriendlyText.descriptionForFaceTecSDKStatus(FaceTecSDK.getStatus());
        // Message to log for developer
        var logMessage = "FaceTecSDK.getStatus(): ".concat(FaceTecSDK.getStatus(), " \"").concat(displayMessage, "\"");
        _a.displayMessage(displayMessage);
        _a.logMessage(logMessage);
    };
    // Process onComplete results from FaceTecSessionResult or FaceTecIDScanResult
    DeveloperStatusMessages.logScanOncompleteResult = function (sessionResult, idScanResult) {
        // User message to display
        var displayMessage = "See logs for details";
        // Message to log for developer
        var logMessage = "Unable to parse status message";
        // Check for an idScanResult
        if (idScanResult != null && idScanResult.status != null) {
            // Special case message for user when the device is locked out
            if (idScanResult.status === FaceTecSDK.FaceTecIDScanStatus.LockedOut) {
                displayMessage = "The device is locked out of FaceTec Browser SDK.";
            }
            logMessage = "FaceTecIDScanResult.status: ".concat(idScanResult.status, " (").concat(FaceTecStatusEnumFriendlyText.descriptionForFaceTecIDScanStatus(idScanResult.status), ")");
            // Add additional logging for the case where the developer cancelled the session before the idScan was processed by the server
            // The developer should be handling this appropriately in the processor
            if (idScanResult.status === FaceTecSDK.FaceTecIDScanStatus.Success && idScanResult.isCompletelyDone === false) {
                logMessage += "\n".concat(_a.LOG_PREFIX, " Developer called idScanResultCallback.cancel before the idScan was successfully processed by the server.");
            }
        }
        // Else show the sessionResult
        else if (sessionResult != null && sessionResult.status != null) {
            // Special case message for user when the device is locked out
            if (sessionResult.status === FaceTecSDK.FaceTecSessionStatus.LockedOut) {
                displayMessage = "The device is locked out of FaceTec Browser SDK.";
            }
            logMessage = "FaceTecSessionResult.status: ".concat(sessionResult.status, " - \"").concat(FaceTecStatusEnumFriendlyText.descriptionForSessionStatus(sessionResult.status), "\"");
            // Add additional logging for the case where the developer cancelled the session before the faceScan was processed by the server
            // The developer should be handling this appropriately in the processor
            if (sessionResult.status === FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully && sessionResult.isCompletelyDone === false) {
                logMessage += "\n".concat(_a.LOG_PREFIX, " Developer called FaceScanResultCallback.cancel before the faceScan was successfully processed by the server.");
            }
        }
        _a.displayMessage(displayMessage);
        _a.logMessage(logMessage);
    };
    return DeveloperStatusMessages;
}());
var DeveloperStatusMessages = DeveloperStatusMessages;
