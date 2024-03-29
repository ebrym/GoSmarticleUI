import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions,Image } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';



const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} >
    <Icon
      size={16}
      family="GalioExtra"
      name="zoom-split"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
      // onPress={() => navigation.navigate('Pro')}
     
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
        searchText: ""
    }
}
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    if (title === 'Title') {
      return [
        <ChatButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (routeName) {
      case 'Home':
        return ([
          
          // <ChatButton key='chat-home' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Deals':
        return ([
          <ChatButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <ChatButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          // <ChatButton key='chat-deals' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          // <ChatButton key='chat-profile' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          // <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
          // <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <ChatButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderSearch = () => {
    const { white,navigation } = this.props;

  //const { searchText } = navigation.state.params ? navigation.state.params : {};
  //const { searchText } = this.state;
  //this.state = {searchText:""};
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Search for books?"
        //value={searchText}
        // onFocus={() => navigation.navigate('Pro')}
        //value={this.setState.searchText}
        onChangeText={(value) => this.setState({searchText: value})} 
        iconContent={
          //<SearchButton key='search-product' navigation={navigation} isWhite={white} />
          // onPress={() => navigation.navigate('Search', { search : this.state.searchText })}>
        
          <TouchableOpacity 
          // onPress={() => this._navigateSearch()}
          onPress={() => navigation.navigate('Search', { search : this.state.searchText , searchtype:"search"})}>
          <Icon size={16} color={theme.COLORS.MAIN} name="zoom-split" family="GalioExtra" />
        </TouchableOpacity>
        
      }
      />
    )
    
  }

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;
    return (
      <Block row style={styles.tabs}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Genre')}>
          <Block row middle>
            <Icon name="grid-square" family="Galio" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleLeft || 'Genre'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Category')}>
          <Block row middle>
            <Icon size={16} name="pin-3" family="Galio" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>{tabTitleRight || 'Category'}</Text>
          </Block>
        </Button>
      </Block>
    )
  }
  renderBanner = () => {
    return (
      <Block row style={styles.tabs}>
         <Image
                          alignSelf="center"
                          source={{uri:"http://admin.gosmarticle.com/upload/mobilebanner.gif"}}
                          style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 100 }]}
                          resizeMode="stretch"
                          // imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 344 }}
                          />
      </Block>
    )
  }

  renderHeader = () => {
    const { search, tabs, banner } = this.props;
    
    if (search) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {/* {tabs ? this.renderBanner() : null} */}
           {/* {tabs ? this.renderTabs() : null} */}
           {this.renderBanner()}
        </Block>
      )
    }
    if (tabs) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {this.renderBanner()}
           {/* {tabs ? this.renderTabs() : null}  */}
           {this.renderTabs()}
        </Block>
      )
    }
    if (banner) {
      return (
        <Block center>
           {this.renderBanner()}
        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ paddingVertical: 12, flex: 0.3 }}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'ICON']},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 10,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
})