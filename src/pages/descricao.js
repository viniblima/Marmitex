import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, AsyncStorage } from 'react-native';
//import { Button } from 'react-native-elements';

var carrinho;
var carrinhos;
var result;
var prato
export default class DescricaoScreen extends React.Component{
    async componentDidMount(){
    const { navigation } = this.props;
    const restauranteId = navigation.getParam('restauranteId');
    const cardapioId = navigation.getParam('cardapioId');
    //const titulo = navigation.getParam('titulo');
    const preco = navigation.getParam('preco');
    //alert(titulo);
    }
    static navigationOptions = ({ navigation, navigationOptions}) => {
        const { params } = navigation.state;
        
        
        //alert(titulo);
        return {
            title: 'Detalhes do produto'
        };
    };
    render(){
        const { navigation } = this.props;
        const { params } = this.props.navigation.state;
        const restauranteId = navigation.getParam('restauranteId');
        const cardapioId = navigation.getParam('cardapioId');
        const titulo = navigation.getParam('titulo');
        const preco = navigation.getParam('preco');
        const ingredientes = navigation.getParam('ingredientes');
        const img = navigation.getParam('img');
        return(
            <View>
            <Image style={styles.flag} source={{uri: img}}/>
            <View style={styles.view}>
            
            
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.item}>{ingredientes}</Text>
            <Text style={styles.preco}>R$ {preco.replace(".",",")}</Text>
            
            
            </View>
            <TouchableOpacity style={{ height: 45, width:100 ,backgroundColor: '#cc0000', left: 120, top: 70}} 
            onPress={() => {adicionarCarrinho(restauranteId, cardapioId, titulo, preco)}}>
            <Text style={styles.button}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
            
            </View>
        );
    }
}
adicionarCarrinho = (restauranteId, cardapioId, titulo, preco) => {
    this.carrinhos = [];
    this.prato = {
        nome: titulo,
        restauranteId: restauranteId,
        cardapioId: cardapioId,
        preco: preco 
    };
    this.carrinhos[0] = this.prato;
    

    
    AsyncStorage.multiGet(["carrinho"]).then(data => {
        let carrinho = data[0];
        getCarrinho(carrinho[1]);
        //alert(carrinho[1]);
        
    });
    
    
    
    //const n = JSON.parse(prato);
    
    //alert(JSON.stringify(this.carrinhos));
}

getCarrinho = (data) => {
    this.carrinho = data;
    //alert(this.carrinho);
    if(this.carrinho == null){
        this.carrinhos = [];
        this.carrinhos[0] = prato;
        alert("carrinho estava vazio");
    }else{
        
        this.carrinhos = JSON.parse(this.carrinho);
        //alert(JSON.stringify(this.carrinhos));
        //alert('carrinho nao ta vazio');
        
        const arrayIndex = this.carrinhos.length;
        this.carrinhos[arrayIndex] = this.prato;
        alert(JSON.stringify(this.carrinhos));
        //alert(arrayIndex);
        AsyncStorage.multiSet([
            ["carrinho", JSON.stringify(this.carrinhos)]
        ]);
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
      width: 280,
      height: 180,
      left: 30,
      top: 25
      
    },
    view: {
        
        flexDirection: 'column',
        paddingTop: 25,
        paddingLeft: 10,
        justifyContent: 'space-between',
        textAlign: 'center'
    },
    item: {
        textAlign: 'left',
        paddingTop: 20
           
    },
    touch: {
        flexDirection: 'row',
        
    },
    title: {
        paddingTop: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 26
    },
    preco: {
        color: '#891118',
        fontSize: 16,
        paddingTop: 20
    },
    button: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 5
    }

  });
