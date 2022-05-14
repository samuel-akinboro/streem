import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList,
    Image,
    ImageBackground,
    Animated
} from 'react-native';
import { SIZES, COLORS, dummyData, icons, FONTS, images } from '../constants';
import { Profiles } from '../components'
import { ProgressBar } from '../components';

const Home = ({ navigation }) => {
    const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
            <Header />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <NewSeasonSection 
                    navigation={navigation}
                    newSeasonScrollX={newSeasonScrollX} 
                />
                <Dots 
                    newSeasonScrollX={newSeasonScrollX} 
                />
                <ContinueWatchingSection 
                    navigation={navigation}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const Header = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding
            }}
        >
            <TouchableOpacity
                style={{
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image 
                    source={images.profile_photo}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50, 
                    width: 50,
                }}
            >
                <Image
                    source={icons.airplay}
                    style={{
                        height: 25,
                        width: 25,
                        tintColor: COLORS.primary
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

const NewSeasonSection = ({ navigation, newSeasonScrollX }) => {
    return (
        <Animated.FlatList
            horizontal
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            decelerationRate={0}
            contentContainerStyle={{
                marginTop: SIZES.radius
            }}
            data={dummyData.newSeason}
            keyExtractor={item=> `${item.id}`}
            onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: newSeasonScrollX } } }
            ], { useNativeDriver: false })}
            renderItem={({item, index}) => {
                return (
                    <TouchableWithoutFeedback
                        onPress={()=> navigation.navigate("MovieDetail", {selectedMovie: item})}
                    >
                        <View
                            style={{
                                width: SIZES.width,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ImageBackground
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    height: SIZES.width * 0.85,
                                    width: SIZES.width * 0.85,
                                    justifyContent: "flex-end"
                                }}
                                imageStyle={{
                                    borderRadius: 40
                                }}
                            >
                                <View
                                    style={{
                                        height: 60,
                                        flexDirection: 'row',
                                        paddingHorizontal: SIZES.radius,
                                        width: '100%',
                                        marginBottom: SIZES.radius
                                    }}
                                >
                                    {/* Play Now */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                backgroundColor: COLORS.transparentWhite
                                            }}
                                        >
                                            <Image 
                                                source={icons.play}
                                                resizeMode="contain"
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    tintColor: COLORS.white
                                                }}
                                            />
                                        </View>
                                        <Text style={{marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3}}>Play Now</Text>
                                    </View>

                                    {/* still watching */}
                                    {item.stillWatching.length > 0 && 
                                        <View style={{justifyContent: 'center'}}>
                                            <Text style={{color: COLORS.white, ...FONTS.h4}}>Still watching</Text>
                                            <Profiles profiles={item.stillWatching} />
                                        </View>
                                    }
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        />
    )
}

const Dots = ({ newSeasonScrollX }) => {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

    return (
        <View 
            style={{
                marginTop: SIZES.padding,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {dummyData.newSeason.map((item, index)=> {
                const opacity = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                const dotWidth = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [6, 20, 6],
                    extrapolate: 'clamp'
                })

                const dotColor = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
                    extrapolate: 'clamp'
                })

                return (
                    <Animated.View
                        key={`Dot-${index}`}
                        opacity={opacity}
                        style={{
                            borderRadius: SIZES.radius,
                            marginHorizontal: 3,
                            width: dotWidth,
                            height: 6,
                            backgroundColor: dotColor
                        }}
                    />
                )
            })}
        </View>
    )
}

const ContinueWatchingSection = ({ navigation }) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Text 
                    style={{
                        flex: 1, 
                        color: COLORS.white, 
                        ...FONTS.h2
                    }}>
                        Continue Watching
                    </Text>
                    <Image
                        source={icons.right_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
            </View>
            {/* Lists */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                data={dummyData.continueWatching}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={()=> navigation.navigate("MovieDetail", { selectedMovie: item })}
                        >
                            <View
                                style={{
                                    marginLeft: index == 0 ? SIZES.padding : 20,
                                    marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 20
                                }}
                            >
                                {/* Thumbnail */}
                                    <Image
                                        source={item.thumbnail}
                                        resizeMode='cover'
                                        style={{
                                            width: SIZES.width / 3,
                                            height: SIZES.width / 3 + 60,
                                            borderRadius: 20
                                        }}
                                    />
                                {/* Name */}
                                    <Text>{item.name}</Text>
                                {/* progress bar */}
                                    <ProgressBar 
                                        contianerStyle={{
                                            marginTop: SIZES.radius
                                        }}
                                        barStyle={{
                                            height: 3
                                        }}
                                        barPercentage={item.overallProgress}
                                    />
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
        </View>
    )
}

export default Home;