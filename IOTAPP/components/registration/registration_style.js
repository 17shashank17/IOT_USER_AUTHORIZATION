import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        margin: 20,
        // alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        fontSize: 60,
        justifyContent: "center",
        alignContent: "center",
    },
    input_common :{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 10,
        padding: 10,
    },
    name_input :{
        // flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "stretch",
    },
    switch_style : {
        flexDirection: 'row',
        marginBottom: 10,
    },
    navigate_to_login : {
        marginBottom: 10,
    }
});