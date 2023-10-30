import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const [isButtonAnimated, setIsButtonAnimated]= useState(false);

	const cartContext = useContext(CartContext);

	const cartItemsNumber =  cartContext.items.reduce((currentValue, item) => {return currentValue + item.amount}, 0)

	const buttonClasses = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

	useEffect(() => {
		if (cartContext.items.length === 0) {
			return;
		}
		setIsButtonAnimated(true) //если кол-во меняется, обновляется setIsButtonAnimated и запускается true
		const timer = setTimeout(() => {
			setIsButtonAnimated(false)//через 300 с обновится состояние на false
		}, 300);
		return () => {
			clearTimeout(timer)//ф-ия очистки таймера
		}
	}, [cartContext.items]);

	return (
	<button className={buttonClasses} onClick={props.onClick}>
		<span className={styles.icon}>
			<CartIcon />
		</span>
		<span>Корзина</span>
		<span className={styles.badge}>{cartItemsNumber}</span>
	</button>
	)
}
export default HeaderCartButton;