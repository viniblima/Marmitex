import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';


var itemId;
async function getAll(url){
    try{    
      const response = await fetch(url);
      const responseJson = await response.json();
      
      return responseJson;
      
    }catch{
      //console.error(error);
  
    }
}


export default class CardapioScreen extends React.Component {
    

    state = { countries: [], loading: true};
    async componentDidMount(){
    const { navigation } = this.props;
    this.itemId = navigation.getParam('itemId');
    const titulo = navigation.getParam('titulo');
    const url = 'http://vservices.com.br/android/servicos/get_cardapio/'+this.itemId;
    
    const countries = await getAll(url);
    this.setState({countries, loading: false});
    
  }
  renderSeparator = () => {
    return (
      
        <View
            style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '1%'
            }}
            >
        
        </View>
    );
};
    static navigationOptions = ({ navigation, navigationOptions}) => {
        const { params } = navigation.state;
        const titulo = navigation.getParam('titulo');
        
        return {
            title: titulo
        };
    };
    
    render() {
        
        
        
        const { params } = this.props.navigation.state;
        return (
            
            <View style ={styles.view}>
             <FlatList
      data ={this.state.countries}
      ItemSeparatorComponent = {this.renderSeparator}
      renderItem={({item}) => 
        
        <View style={{paddingBottom: 20}}>
            <TouchableOpacity 
                style={styles.touch}
                onPress ={() => {

                    this.props.navigation.navigate({ routeName: 'Descricao', params:{restauranteId: this.itemId, cardapioId: item.id, titulo: item.nome, preco: item.preco, ingredientes: item.ingredientes, img: item.img_url} });
                
                }
                }>
                
                

                <View style={styles.view}>
                    <Text style={styles.item}>
                        {item.nome}
                    </Text>
                    <Text style={styles.ingredientes}>
                        {item.ingredientes}
                    </Text>
                    <Text style={styles.preco}>
                        R$ {item.preco.replace(".",",")}
                    </Text>
                    
                </View>
                <View style={styles.view}>
                    <Image
                        style = {styles.flag}
                        source = {{ uri: item.img_url }}
                    />
                    </View>
            </TouchableOpacity>
            
        </View>}
      />
            
            </View>
            
          );
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
      width: 60,
      height: 60,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: 10,
      paddingTop: 20

    },
    view: {
        
        flexDirection: 'column',
        paddingTop: 25,
        paddingLeft: 6,
        justifyContent: 'space-between'
        
    },
    item: {
        
        
           
    },
    flat: {
        height: 80
    },
    ingredientes: {
        color: '#909192',
        width: 250
    },
    touch: {
        flexDirection: 'row',
        
    },
    preco: {
        color: '#891118'
    }
  });