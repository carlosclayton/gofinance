import {CategoryProps} from "./CategoryProps";
import {TransactionTypeProps} from "./TransactionTypeProps";

export interface TransactionCardProps extends TransactionTypeProps{
    name: string;
    amount: string;
    category: CategoryProps;
    date: string;
}
