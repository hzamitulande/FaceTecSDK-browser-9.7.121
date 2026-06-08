// Load custom sound files
var SoundFileUtilities = /** @class */ (function () {
    function SoundFileUtilities() {
        // Return the customization object updated with custom sound files
        this.setVocalGuidanceSoundFiles = function (currentCustomization) {
            currentCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile = PLEASE_FRAME_YOUR_FACE_SOUND_FILE;
            currentCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile = PLEASE_MOVE_CLOSER_SOUND_FILE;
            currentCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile = PLEASE_RETRY_SOUND_FILE;
            currentCustomization.vocalGuidanceCustomization.uploadingSoundFile = UPLOADING_SOUND_FILE;
            currentCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile = FACESCAN_SUCCESSFUL_SOUND_FILE;
            currentCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile = PLEASE_PRESS_BUTTON_SOUND_FILE;
            return currentCustomization;
        };
    }
    return SoundFileUtilities;
}());
var SoundFileUtilities = SoundFileUtilities;
