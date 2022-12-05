import { View, Button,Card,Colors,} from "react-native-ui-lib";
import { getDatabase, ref, get, update } from "firebase/database";
import { useState, useEffect } from "react";
import * as React from "react";
import { Dimensions } from "react-native";




export default function QuizMenuItem(props) {
    const [isExpanded, setIsExpanded] = useState(false)
    let db = getDatabase()

    const [hasSeen, setHasSeen] = useState(false)



    //this use effect hook checks whether the current user has already selected a team to join for the current game
    //this is used to determine whether to navigate a user directly to a game or ask them to join a team
    useEffect(() => {
        async function hasBeenJoined() {

            let userGame = await get(ref(db, `/users/${Object.keys(props.game)[0]}/${props.uid}/`))
            userGame = userGame.val()
            if (userGame["team"] != undefined) {
                setHasSeen(true)
            } else {

                setHasSeen(false)
            }

        }
        hasBeenJoined()





    }, [])


    function handleTeamSet(team) {

        update(ref(db, 'users/' + Object.keys(props.game)[0] + "/" + props.uid), {
            "team": team
        });
        setHasSeen(true)
        setIsExpanded(false)
        props.navigation.navigate("Quiz", { game: Object.keys(props.game)[0] })

    }

    function handleExpansion() {


        if (hasSeen) {
            props.navigation.navigate("Quiz", { game: Object.keys(props.game)[0] })



        } else {
            setIsExpanded(!isExpanded)
        }


    }





    let expandedSection = null

    if (isExpanded) {
        expandedSection = (
            <View style={{
                height: 60, backgroundColor: Colors.rgba('#2e2f33', 1), width: Dimensions.get('window').width, justifyContent: "space-evenly", flexDirection: "row", alignItems: "center", display: "flex",
                margin: 0,
            }}>
                <Button
                    style={{backgroundColor: "#cddc29"}}
                    color="white"
                    fullWidth={true}
                    sizes={Button.sizes.xSmall}
                    onPress={() => {
                        handleTeamSet(props.game[Object.keys(props.game)[0]]["HomeTeam"])
                    }
                    }
                    label={"Join As  " + props.game[Object.keys(props.game)[0]]["HomeTeam"]} />
                <Button
                    style={{backgroundColor: "#cddc29"}}
                    color="white"
                    fullWidth={true}
                    sizes={Button.sizes.xSmall}
                    onPress={() => {


                        handleTeamSet(props.game[Object.keys(props.game)[0]]["AwayTeam"])
                    }
                    }

                    label={"Join As  " + props.game[Object.keys(props.game)[0]]["AwayTeam"]} />
            </View>)
    }




    return (
        <View style={{
            borderTopWidth: 0,
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: 0,
            margin: 0,
            borderColor: Colors.rgba('#000000', 1),
        }}>
            <Card
                height={60}
                enableShadow={false}
                borderRadius={0}
                label={"Go to Quiz"}
                style={{
                    justifyContent: "center", alignItems: "center", borderWidth: 1,
                    borderStyle: "solid",
                    margin: 0,
                    borderColor: Colors.rgba('#000000', 0.1)
                }}


                onPress={() => {

                    handleExpansion()
                }

                }
            >
                <Card.Section
                    backgroundColor={Colors.rgba('#cddc29', 1)}
                    width={Dimensions.get('window').width}
                    contentStyle={{ alignItems: "center", flexDirection: "row", justifyContent: "space-evenly", height: 60, width: Dimensions.get('window').width }}
                    content={[
                        {
                            text: props.game[Object.keys(props.game)[0]]["HomeTeam"],
                            text80: true,
                        },
                        {
                            text: "VS",
                            text70: true,
                        },
                        {
                            text: props.game[Object.keys(props.game)[0]]["AwayTeam"],
                            text80: true,
                        },
                    ]}
                >
                </Card.Section>
            </Card>
            {expandedSection}
        </ View>)





}