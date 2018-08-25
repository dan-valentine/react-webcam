import React, { Component } from 'react';

export default class WebCam extends Component {
    constructor() {
        super();
        this.state = {
            devices: [],
            currentStream: null,
            selectedDevice: '',
            photos: []
        }
    }

    componentDidMount() {
        // this.video = document.getElementById('webcam');
        navigator.mediaDevices.enumerateDevices().then(this.gotDevices);
        this.cameraOn();

    }

    stopMediaTracks = () => {
        if (this.state.stream) {
            this.state.stream.getTracks().forEach(track => {
                track.stop();
            });
            this.setState({
                stream: null
            })
        }
    }

    componentWillUnmount() {
        this.stopMediaTracks();
    }

    selectCamera = e => {
        if (e.target.value) {
            this.setState({
                selectedDeviceId: e.target.value
            })
        }
    }
    cameraOn = event => {
        this.stopMediaTracks();
        if(event){
            event.preventDefault();
        }
        const { selectedDeviceId } = this.state;
        let videoConstraints = true;
        if (selectedDeviceId) {
            videoConstraints = {
                deviceId: { exact: selectedDeviceId }
            }
        }

        const constraints = {
            video: videoConstraints,
            audio: false
        };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                this.video.srcObject = stream;
                this.video.play();
                this.setState({ stream })
            })
            .catch(error => {
                console.error(error);
            });
    }

    gotDevices = (mediaDevices) => {
        const devices = mediaDevices.filter(mediaDevice => mediaDevice.kind === 'videoinput')
        if(this.state.selectedDeviceId && devices.length){
            this.setState({ devices })

        }else{
            this.setState({ devices,
            selectedDeviceId: devices[0].deviceId })
        }
    }

    takeImg = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.video.offsetWidth;
        canvas.height = this.video.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);

        //convert to desired file format
        const  dataURI = canvas.toDataURL('image/jpeg'); // can also use 'image/png'
        return dataURI;
    }

    saveImg = () =>{
        const tempPhotos = this.state.photos.slice();
        tempPhotos.push(this.takeImg());
        this.setState({
            photos: tempPhotos
        })

    }
    render() {
        const { devices, selectedDeviceId, photos } = this.state;
        const videoStyle = {
            background: "tomato",
            // height: '400px',
            // width: '400px',
        }
        const options = devices.map((mediaDevice, i) =>
            (<option value={mediaDevice.deviceId}>{mediaDevice.label || `camera ${i}`}</option>)
        )
        const photosDisplay = photos.map(e=><img src={e}/>)
        return (
            <div>
                <form onSubmit={this.cameraOn}>
                    <button type="submit">Get Camera</button>
                    <select value={selectedDeviceId} required={true} onChange={this.selectCamera}>
                        <option value=''>Select Camera</option>
                        {options}
                    </select>
                </form>
                <video id='webcam' ref={video => this.video = video} style={videoStyle} />
                <div>
                    <button onClick={_ => this.saveImg()} >Take </button>
                    <button onClick={_ => this.video.pause()} >PAUSE </button>
                    <button onClick={_ => this.video.play()} >PLAY </button>
                    <button onClick={_ => this.stopMediaTracks()} >Turn Off </button>
                </div>
                <div>{photosDisplay}</div>
            </div>
        );
    }
}