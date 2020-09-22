import Constants from 'expo-constants'
import * as Permissions from  'expo-permissions'

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.io) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != 'granted') {
                alert('Permission to access camera roll?')
            }
        }
    }
}

export default new UserPermissions()