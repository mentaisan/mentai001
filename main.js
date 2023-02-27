const scan = document.getElementById('scanBtn');
const disconnect = document.getElementById('disConnect');

scan.addEventListener('click', () => {
    startScan();
});

disconnect.addEventListener('click', () => {
    onDisconnected();
})
//----------------------------------------------------------------------

//UUID登録 使うサービスとcharacteristicのUUIDを登録する
const serviceUUID = '00000000-0000-0000-0000-000000000000';
//デバイスからのデータCharacteristic
const CharacteristicUUID_Notification = '000000000-0000-0000-0000-000000000000';
const CharacteristicUUID_ReadRead = '00000000-0000-0000-0000-000000000000';
const CharacteristicUUID_Write = '00000000-0000-0000-0000-000000000000';

// BLE接続用
let keyDevice;
let keyServer;
let keyService;
let keyNotificationCharacteristic;
let keyReadCharacteristic;
let keyWriteCharacteristic;


/**
 * web bluetooth api
 * bluetooth接続機器をスキャンする
 */
const startScan = () => {
    navigator.bluetooth.requestDevice({
        filters: [{
            //name: 'デバイス名',
            //namePrefix:'デバイスのプレフィックス',
            services: [serviceUUID],
        }]
    })
        .then(device => {
            startModal('接続中…');
            //接続
            console.log("device.id    : " + device.id);
            console.log("device.name  : " + device.name);
            console.log("device.uuids : " + device.uuids);
            keyDevice = device;
            keyDevice.addEventListener('gattserverdisconnected', onDisconnected);
            return device.gatt.connect();
        })
        //サービスを取得
        .then(server => {
            keyServer = server;
            console.log('Getting service...');
            return server.getPrimaryService(serviceUUID);
        })
        //Characteristicを取得
        .then(service => {
            keyService = service;
            console.log('Getting Notification Characteristic...');
            //複数のCharacteristicを使う場合はここから更に登録する
            return service.getCharacteristic(//使用するCharaceristicUUID);
        })
        //Characteristicの動作
        .then(characteristic => {
            // characteristicに対してRead/Write/Notificationsの処理を記述
        })
        .catch(error => {
            console.log(error);
        })
};

const onDisconnected = () => {
    console.log('> Bluetooth Device disconnected')
};
