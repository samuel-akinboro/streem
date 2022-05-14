import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native';

import { ProgressBar } from '../components'
import { COLORS, SIZES, FONTS, icons } from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const MovieDetail = ({ navigation, route }) => {
    const [ selectedMovie, setSelectedMovie ] = React.useState(null)
    
    React.useEffect(()=>{
        let { selectedMovie } = route.params;
        setSelectedMovie(selectedMovie)
    }, [])

    return (
        <ScrollView 
            contentContainerStyle={{ 
                flex: 1,
                backgroundColor: COLORS.black
            }}
            style={{
                backgroundColor: COLORS.black
            }}
        >
            {/* Banner */}
                <Banner 
                    selectedMovie={selectedMovie} 
                    navigation={navigation}
                />
            {/* Categories & ratings */}
                <CategoryInfo selectedMovie={selectedMovie} />
            {/* Movie Details */}
        </ScrollView>
    )
}

const Banner = ({ selectedMovie, navigation }) => {
    return (
        <ImageBackground
            source={selectedMovie?.details?.image}
            style={{
                height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
                width: '100%'
            }}
        >
            <View
                style={{
                    flex: 1
                }}
            >
                {/* Header */}
                <BannerHeader navigation={navigation} />

                {/* Gradient */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}
                >
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 0, y: 1}}
                        colors={['transparent', '#000']}
                        style={{
                            height: 150,
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                    >
                        {/* Season */}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            >
                                {selectedMovie?.details?.season}
                            </Text>
                        {/* Name */}
                            <Text
                                style={{
                                    color: COLORS.white,
                                    marginTop: SIZES.base,
                                    ...FONTS.h1
                                }}
                            >
                                {selectedMovie?.name}
                            </Text>
                    </LinearGradient>
                </View>
            </View>
        </ImageBackground>
    )
}

const BannerHeader = ({ navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: Platform.OS == 'ios' ? 40 : 20,
                paddingHorizontal: SIZES.padding,
            }}
        >
            {/* Back Button */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 50,
                        backgroundColor: COLORS.transparentBlack,
                        borderRadius: 20
                    }}
                    onPress={()=> navigation.goBack()}
                >
                    <Image
                        source={icons.left_arrow}
                        resizeMode="contain"
                        style={{
                            tintColor: COLORS.white,
                            height: 20,
                            width: 20,
                        }}
                    />
                </TouchableOpacity>
            {/* Share Button */}
            <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 50,
                        backgroundColor: COLORS.transparentBlack,
                        borderRadius: 20
                    }}
                    onPress={()=> console.log('share')}
                >
                    <Image
                        source={icons.upload}
                        resizeMode="contain"
                        style={{
                            tintColor: COLORS.white,
                            height: 25,
                            width: 25,
                        }}
                    />
                </TouchableOpacity>
        </View>
    )
}

const CategoryInfo = ({ selectedMovie }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: SIZES.base
            }}
        >
            {/* Age group */}
                <View
                    style={[
                        styles.categoryContainer,
                        {
                            marginLeft: 0
                        }
                    ]}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h4
                        }}
                    >
                        {selectedMovie?.details?.age}
                    </Text>
                </View>
            {/* Genre */}
                <View
                    style={styles.categoryContainer}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h4
                        }}
                    >
                        {selectedMovie?.details?.genre}
                    </Text>
                </View>
            {/* Rating */}
                <View
                    style={styles.categoryContainer}
                >
                    <Image 
                        source={icons.star}
                        style={{
                            height: 15,
                            width: 15,
                            marginRight: 4
                        }}
                    />

                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h4
                        }}
                    >
                        {selectedMovie?.details?.ratings}
                    </Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray1
    }
})

export default MovieDetail;