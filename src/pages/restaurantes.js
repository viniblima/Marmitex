import React from 'react';
import { TouchableOpacity, View, Text, Image, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

var img = 'C:\Users\Nexon\Desktop\NexonApp\Props\src\images\cart.png';
const url = 'http://vservices.com.br/android/servicos/get_restaurantes';
async function getAll(){
  try{    
    const response = await fetch(url);
    const responseJson = await response.json();
   
    return responseJson;
  }catch{
    //console.error(error);

  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flag: {
      borderWidth: 1,
      borderColor: '#c7c6c6',
      width: 80,
      height: 80,
      borderRadius: 40
      

    },
    view: {
        
        flexDirection: 'column',
        paddingTop: 25,
        paddingLeft: 10,
        justifyContent: 'space-between'
    },
    item: {
        
        
           
    },
    touch: {
        flexDirection: 'row',
        
    },
    floatButton: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
  });



export default class RestaurantesScreen extends React.Component {



  state = { countries: [], loading: true};
  async componentDidMount(){
    const countries = await getAll();
    this.setState({countries, loading: false});
  }
  renderSeparator = () => {
    return (
      
        <View
            style={{
                height: 1,
                width: '95%',
                backgroundColor: '#a5a4a4',
                marginLeft: 2,
                
                
            }}
            >
        
        </View>
    );
};
  render() {
    const title = 'Marmitex';
    if(this.state.loading){
      return(
          
          <View style={{flex: 1, padding: 20}}>
          
          <ActivityIndicator size="large" color="#0000ff" />
          
          </View>
          
      ); 
  }
    return (
        
        


    <View style ={styles.view}>
    
    
    <TouchableOpacity>
        <Image source = {{uri: 'C:\Users\Nexon\Desktop\NexonApp\Props\src\images\cart.png'}}/>
    </TouchableOpacity>
    

      <FlatList
      data ={this.state.countries}
      ItemSeparatorComponent = {this.renderSeparator}
      renderItem={({item}) => 
        
        <View style={{paddingBottom: 20}}>
            <TouchableOpacity 
                style={styles.touch}
                onPress ={() => {

                    this.props.navigation.navigate({ routeName: 'Cardapio', params:{itemId: item.id, titulo: item.nome} });
                
                }
                }>
                <View style={styles.view}>
                    <Image
                        style = {styles.flag}
                        source = {{ uri: item.imgurl }}
                    />
                    </View>

                <View style={styles.view}>
                    <Text style={styles.item}>
                        {item.nome}
                    </Text>
                    <Text style={styles.item}>
                        {item.nome}
                    </Text>
                    <Text style={styles.item}>
                        {item.nome}
                    </Text>
                </View>
            </TouchableOpacity>
            
        </View>}
      />
      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} >
      <Image source={{uri: './src/images/cart.png'}}style={styles.floatButton}/>
      </TouchableOpacity>
      </View>
      
    );
    
  }
}