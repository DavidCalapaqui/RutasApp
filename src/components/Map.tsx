import React,{useRef} from 'react'
import MapView, {Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: typeof Marker[];
}


export const Map = ( {markers}: Props ) => {

    const {hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowUserLocation, routeLines}= useLocation()

    //mantener la referencia
    const mapViewRef = useRef <MapView>()
    const following = useRef <boolean>()

    const [showPolyline, setShowPolyline] = useState(true)

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation()
        }

    }, [])
    
    useEffect(() => {

        if(!following.current)return;

        const location = userLocation;
        mapViewRef.current?.animateCamera({
            center: location
        })
    }, [userLocation])
    

    const centerPosition = async () => {
        const location = await getCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: location
        })
    }

    if(!hasLocation){
        return <LoadingScreen />
    }

  return (
    <>
        <MapView
          ref={ (el) => mapViewRef.current = el!  }
          provider={PROVIDER_GOOGLE}
          style={{flex:1, borderColor:'red'}}
          showsUserLocation
          initialRegion={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onTouchStart={ () => following.current = false }
        >
            { showPolyline &&

                <Polyline 
                    coordinates={routeLines}
                    strokeColor="black"
                    strokeWidth={3}

                />
            }

            {/* <Marker
                image={ require('../assets/custom-marker.png') }
                coordinate={ {
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="Title"
                description='DEsc'
            
            /> */}
            

        </MapView>

        <Fab 
            iconName='explore'
            onPress={ centerPosition }
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20
            }}
        />
        <Fab 
            iconName='brush'
            onPress={ () => setShowPolyline( (value) => !value ) }
            style={{
                position: 'absolute',
                bottom: 80,
                right: 20
            }}
        />
    
    </>
  )
}
