import type { FaceTecIDScanStatus, FaceTecSDKStatus, FaceTecSessionStatus } from "../../../../core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { FaceTecSDK } from "../../../../core-sdk/FaceTecSDK.js/FaceTecSDK";

// Class with friendly descriptions for FaceTecSDK Status Enums
//
// DEVELOPER NOTE:  These properties are for demonstration purposes only to help developers in getting familiar with the FaceTec SDK Status enum values
// In the code in your own App, you should design your own methods and appropriate feedback to end users
// This class is not intended for production code.
//
export class FaceTecStatusEnumFriendlyText {
  static descriptionForSessionStatus(enumValue: FaceTecSessionStatus): string {
    switch (enumValue) {
      case FaceTecSDK.FaceTecSessionStatus.DocumentNotReady:
        return "Session cancelled because document is not in ready state.";
      case FaceTecSDK.FaceTecSessionStatus.SessionInProgress:
        return "Session cancelled because a Session is already in progress.";
      case FaceTecSDK.FaceTecSessionStatus.CameraNotRunning:
        return "Session cancelled because selected camera is not active.";
      case FaceTecSDK.FaceTecSessionStatus.Timeout:
        return "Session cancelled due to timeout.";
      case FaceTecSDK.FaceTecSessionStatus.ContextSwitch:
        return "Session cancelled because of Context Switch.";
      case FaceTecSDK.FaceTecSessionStatus.ProgrammaticallyCancelled:
        return "Session cancelled programmatically by developer.";
      case FaceTecSDK.FaceTecSessionStatus.OrientationChangeDuringSession:
        return "Session cancelled because device orientation change.";
      case FaceTecSDK.FaceTecSessionStatus.LandscapeModeNotAllowed:
        return "Session did not start because user is in landscape mode.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelled:
        return "User cancelled the session before completion.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledFromRetryGuidance:
        return "User cancelled from the retry screen.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledFromNewUserGuidance:
        return "User cancelled from the new user guidance.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledWhenAttemptingToGetCameraPermissions:
        return "User cancelled from camera permissions error screen, when attempting to get camera permissions.";
      case FaceTecSDK.FaceTecSessionStatus.LockedOut:
        return "FaceTec Browser SDK is in a lockout state.";
      case FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully:
        return "The Session was performed successfully and a FaceScan was generated.";
      case FaceTecSDK.FaceTecSessionStatus.CameraNotEnabled:
        return "The user did not enable the camera after prompting for camera permissions or camera permissions were previously denied.";
      case FaceTecSDK.FaceTecSessionStatus.NonProductionModeDeviceKeyIdentifierInvalid:
        return "The Key was never validated.";
      case FaceTecSDK.FaceTecSessionStatus.InitializationNotCompleted:
        return "FaceTec Browser SDK was never successfully initialized.";
      case FaceTecSDK.FaceTecSessionStatus.MissingGuidanceImages:
        return "The Session was cancelled because not all guidance images were configured.";
      case FaceTecSDK.FaceTecSessionStatus.UnknownInternalError:
        return "The Session was cancelled because of an unknown and unexpected error.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledViaClickableReadyScreenSubtext:
        return "The Session cancelled because user pressed the Get Ready screen subtext message.";
      case FaceTecSDK.FaceTecSessionStatus.NotAllowedUseIframeConstructor:
        return "The Session was cancelled because you used the iFrame Constructor but the calling context is not in an iFrame.";
      case FaceTecSDK.FaceTecSessionStatus.NotAllowedUseNonIframeConstructor:
        return "The Session was cancelled because you used the non-iFrame Constructor in an iFrame.";
      case FaceTecSDK.FaceTecSessionStatus.IFrameNotAllowedWithoutPermission:
        return "The Session was cancelled because you do not have permission to run the FaceTec Browser SDK in an iFrame. Please contact FaceTec to request the needed code.";
      case FaceTecSDK.FaceTecSessionStatus.StillLoadingResources:
        return "FaceTec SDK Required resources are still loading.";
      case FaceTecSDK.FaceTecSessionStatus.ResourcesCouldNotBeLoadedOnLastInit:
        return "FaceTec SDK Required resources failed to load on last init.";
      case FaceTecSDK.FaceTecSessionStatus.UserCancelledFullScreenMode:
        return "The Session was cancelled because a full screen mode change was detected from an IFrame.";
      default:
        return "Unexpected FaceTecSessionStatus Value: " + enumValue;
    }
  }

  /** Gets a friendly string for representing the status of the SDK */
  static descriptionForFaceTecSDKStatus(enumValue: FaceTecSDKStatus): string {
    switch (enumValue) {
      case FaceTecSDK.FaceTecSDKStatus.NeverInitialized:
        return "Initialize was never attempted.";
      case FaceTecSDK.FaceTecSDKStatus.Initialized:
        return "Initialized Successfully.";
      case FaceTecSDK.FaceTecSDKStatus.NetworkIssues:
        return "Check your network connection.";
      case FaceTecSDK.FaceTecSDKStatus.InvalidDeviceKeyIdentifier:
        return "The Key provided was invalid.";
      case FaceTecSDK.FaceTecSDKStatus.VersionDeprecated:
        return "Current version of SDK is deprecated.  This enum response is DEPRECATED and no longer returned.";
      case FaceTecSDK.FaceTecSDKStatus.DeviceNotSupported:
        return "Device/Browser not supported.";
      case FaceTecSDK.FaceTecSDKStatus.DeviceInLandscapeMode:
        return "FaceTec Browser SDK must be used in portrait orientation.";
      case FaceTecSDK.FaceTecSDKStatus.DeviceLockedOut:
        return "The device is locked out of FaceTec Browser SDK.";
      case FaceTecSDK.FaceTecSDKStatus.KeyExpiredOrInvalid:
        return "The Key was expired, contained invalid text, or you are attempting to initialize on a domain that is not specified in your Key.";
      case FaceTecSDK.FaceTecSDKStatus.IFrameNotAllowedWithoutPermission:
        return "Using FaceTec SDKs in an iFrame requires permission from FaceTec.  Please contact FaceTec for more details.";
      case FaceTecSDK.FaceTecSDKStatus.StillLoadingResources:
        return "FaceTec SDK Required resources are still loading.";
      case FaceTecSDK.FaceTecSDKStatus.ResourcesCouldNotBeLoadedOnLastInit:
        return "FaceTec SDK Required resources failed to load on last init.";
      case FaceTecSDK.FaceTecSDKStatus.GetUserMediaRemoteHTTPNotSupported:
        return "Browser Camera APIs are only supported on localhost or https.";
      default:
        return "Unexpected FaceTecSDKStatus Value: " + enumValue;
    }
  }

  /**
   * Gets a friendly string to describe the result of FaceTec Browser SDK ID Scan.
   */
  static descriptionForFaceTecIDScanStatus(enumValue: FaceTecIDScanStatus): string {
    switch (enumValue) {
      case FaceTecSDK.FaceTecIDScanStatus.CameraError:
        return "ID Scan cancelled due to a camera error.";
      case FaceTecSDK.FaceTecIDScanStatus.CameraNotEnabled:
        return "The user did not enable the camera after prompting for camera permissions or camera permissions were previously denied.";
      case FaceTecSDK.FaceTecIDScanStatus.ContextSwitch:
        return "ID Scan cancelled because a Context Switch occurred.";
      case FaceTecSDK.FaceTecIDScanStatus.Success:
        return "The ID Scan was performed successfully and identity document data was generated.";
      case FaceTecSDK.FaceTecIDScanStatus.TimedOut:
        return "ID Scan cancelled due to timeout.";
      case FaceTecSDK.FaceTecIDScanStatus.Unsuccess:
        return "The ID Scan was not performed successfully and identity document data was not generated.";
      case FaceTecSDK.FaceTecIDScanStatus.UserCancelled:
        return "The user pressed the cancel button and did not complete the ID Scan process.";
      case FaceTecSDK.FaceTecIDScanStatus.Skipped:
        return "ID Scan was skipped.";
      case FaceTecSDK.FaceTecIDScanStatus.LandscapeModeNotAllowed:
        return "FaceTec Browser SDK must be used in portrait orientation.";
      case FaceTecSDK.FaceTecIDScanStatus.LockedOut:
        return "FaceTec Browser SDK is in a lockout state.";
      case FaceTecSDK.FaceTecIDScanStatus.UnknownInternalError:
        return "The ID Scan was cancelled because of an unknown and unexpected error.";
      default:
        return "Unexpected PreloadResult Value: " + enumValue;
    }
  }
}
