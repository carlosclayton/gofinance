import React, {useState} from "react";
import {Container, Header, Title, Category, Icon, Name, Separator, Footer} from './styles'
import {FlatList} from "react-native";
import {categories} from "../../utils/categories";
import { Button } from "../../components/Forms/Button"

interface Category{
    key: string;
    name: string;
}
interface Props{
    category: Category;
    setCategory: (category:Category) => void;
    closeSelectCategory: () => void;

}
export function CategorySelect({category, setCategory, closeSelectCategory} :Props) {

    return (
        <Container>
            <Header>
                <Title>Category</Title>
            </Header>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%'}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category>
                        <Icon name={item.icon}></Icon>
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />

            <Footer>
                <Button
                    title="Select"
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    );
}
