import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
 var count1=0;
 var j=0;
class TapWrongGridComponent extends Component {
   constructor(props) {
       super(props);
   }
    state={ show: false };
    onButtonPress() {
        j=0;
        var ind=this.props.wrong.indexOf(this.props.name1);
       
      if(ind!=-1){
        this.props.wrong.splice(ind,1);
       console.log("delete", this.props.wrong);}
        count1=count1+1;
        for(let i=0;i<this.props.wrong.length;i++){
            console.log("wrong new length", this.props.wrong.length, this.props.wrong[i]);
            if(this.props.correct[j]==this.props.wrong[i]){
               j++; console.log("hai",j);
            }
        }
     
        if(count1>=6) {
            count1=0;
            Alert.alert(
                'Game Over',
                'Restart Game ?',
                [
                  {text: 'Restart', onPress: () => this.props.navigation.goBack()}
                 
                ],
                { 
                     cancelable: false 
                }
              )
        }
      //console.log(this.props.array2.length);
    //  console.log("name of second array",this.props.name2);
     // if(this.props.name2) {
  /*  for(let u=0; u<=this.props.wrong.length; u++){
    if(this.props.name1===this.props.wrong[u]) {
         
        this.setState({ show: true });}
    }
      
*/
this.props.wrong.splice(ind,0,this.props.name1);
console.log("j is now",j);
if(j>=3){
    this.setState({ show: true });
  }else{
        this.refs.view.wobble(1000);
        

  }





    }
    
   render () {
       console.log("key",this.props.key1);
       console.log("correct", this.props.correct);
       console.log("wrong",this.props.wrong);
       
       count1=0;
    const { containerStyle, textStyle } = styles;
    if(this.state.show){
        return <View />;
    }
   // console.log("this is data", this.props.data);
   // console.log("this is the name",this.props.name,this.props.key1,this.props.key2)
  
    return (
        <Animatable.View ref="view" >
      <TouchableOpacity onPress={this.onButtonPress.bind(this) }>
           <View style={ containerStyle } >
               <Text style={ textStyle }>{this.props.name1}</Text>
            </View>
      </TouchableOpacity>
</Animatable.View>

    );
    }
}
const styles = {
    containerStyle: {
        height: 80, 
        width: 80, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#f9ece3',
        borderRadius: 9
    },
    textStyle: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 80 

    }
}
export default TapWrongGridComponent;
