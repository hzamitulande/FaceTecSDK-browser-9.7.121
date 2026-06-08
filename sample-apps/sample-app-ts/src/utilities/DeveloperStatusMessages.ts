import type { FaceTecIDScanResult, FaceTecSessionResult } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecStatusEnumFriendlyText } from "./FaceTecStatusEnumFriendlyText";

// Helper class to log and or display SampleApp messages.
// This classes sole purpose is to help developers learn about the FaceTecSDK response statuses.
export class DeveloperStatusMessages {
  public static LOG_PREFIX: string = "FaceTec SampleApp:";
  // Display the message on the screen for the user
  public static displayMessage = (message: string): void => {
    (document.getElementById("status") as HTMLElement).innerHTML = message;
  };

  // Log the message to the console for the developer. Prefix with FaceTec SampleApp: so the messages can be filtered
  public static logMessage = (message: string): void => {
    console.log(`${this.LOG_PREFIX} ${message}`);
  };

  // Log the message and display on screen for the user
  public static logAndDisplayMessage = (message: string): void => {
    this.displayMessage(message);
    this.logMessage(message);
  };

  // Process the FaceTecSDK.getStatus result
  public static logInitializeResult = (): void => {
    // User message to display
    const displayMessage: string = FaceTecStatusEnumFriendlyText.descriptionForFaceTecSDKStatus(FaceTecSDK.getStatus());
    // Message to log for developer
    const logMessage: string = `FaceTecSDK.getStatus(): ${FaceTecSDK.getStatus()} "${displayMessage}"`;

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };

  // Process onComplete results from FaceTecSessionResult or FaceTecIDScanResult
  public static logScanOncompleteResult = (sessionResult: FaceTecSessionResult | null, idScanResult: FaceTecIDScanResult | null): void => {
    // User message to display
    let displayMessage: string = "See logs for details";
    // Message to log for developer
    let logMessage: string = "Unable to parse status message";

    // Check for an idScanResult
    if(idScanResult != null && idScanResult.status != null) {
      // Special case message for user when the device is locked out
      if(idScanResult.status === FaceTecSDK.FaceTecIDScanStatus.LockedOut) {
        displayMessage = "The device is locked out of FaceTec Browser SDK.";
      }

      logMessage = `FaceTecIDScanResult.status: ${idScanResult.status} (${FaceTecStatusEnumFriendlyText.descriptionForFaceTecIDScanStatus(idScanResult.status)})`;

      // Add additional logging for the case where the developer cancelled the session before the idScan was processed by the server
      // The developer should be handling this appropriately in the processor
      if(idScanResult.status === FaceTecSDK.FaceTecIDScanStatus.Success && idScanResult.isCompletelyDone === false) {
        logMessage += `\n${this.LOG_PREFIX} Developer called idScanResultCallback.cancel before the idScan was successfully processed by the server.`;
      }
    }
    // Else show the sessionResult
    else if(sessionResult != null && sessionResult.status != null) {
      // Special case message for user when the device is locked out
      if(sessionResult.status === FaceTecSDK.FaceTecSessionStatus.LockedOut) {
        displayMessage = "The device is locked out of FaceTec Browser SDK.";
      }

      logMessage = `FaceTecSessionResult.status: ${sessionResult.status} - "${FaceTecStatusEnumFriendlyText.descriptionForSessionStatus(sessionResult.status)}"`;

      // Add additional logging for the case where the developer cancelled the session before the faceScan was processed by the server
      // The developer should be handling this appropriately in the processor
      if(sessionResult.status === FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully && sessionResult.isCompletelyDone === false) {
        logMessage += `\n${this.LOG_PREFIX} Developer called FaceScanResultCallback.cancel before the faceScan was successfully processed by the server.`;
      }
    }

    this.displayMessage(displayMessage);
    this.logMessage(logMessage);
  };
}
