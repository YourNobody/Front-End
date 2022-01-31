import styles from "./Change.module.css";
import {Button, Card, HTag, Image, Input} from "../../../components";
import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import React, {FC} from "react";
import {ChangeProps} from "./Change.props";
import {useInput} from "../../../hooks/useInput.hook";

export const Change: FC<ChangeProps> = ({changeOption,...props}) => {
    const { register, clearValues, handleSubmit, getValues } = useInput();

    const handleChangeSubmit = (formData) => {
        console.log('changeOption: ', changeOption);
        console.log(formData);
    };

    const changeNameTemplate = <>
        <Input
            label="Your new name:"
            type="text"
            placeholder="Write you new name"
            {...register("name")}
        />
        <Input
            label="Password for the confirmation:"
            type="text"
            placeholder="Your password"
            {...register("password")}
        />
    </>;

    const changePasswordTemplate = <>
        <Input
            label="New password:"
            type="text"
            placeholder="New password"
            {...register("password")}
        />
        <Input
            label="Confirm password:"
            type="text"
            placeholder="Confirm password"
            {...register("confirm")}
        />
        <Input
            label="Old password:"
            type="text"
            placeholder="Old password"
            {...register("old_password")}
        />
    </>;

    const changeEmailTemplate = <>
        <Input
            label="New Email:"
            type="text"
            placeholder="New Email"
            {...register("email")}
        />
        <Input
            label="Password for the confirmation:"
            type="text"
            placeholder="Your password"
            {...register("password")}
        />
    </>;

    const templates = {
      name: changeNameTemplate,
      email: changeEmailTemplate,
      password: changePasswordTemplate
    };

    const titles = {
      name: {
				title: 'Change of the account name',
	      button: 'Change Name'
      },
      email: {
				title: 'Change of the account email',
	      button: 'Change Password'
      },
      password: {
				title: 'Change of the password',
	      button: 'Change Email'
      }
    };

    return (
			<Card {...props} className={styles.changeWrapper}>
				<form onSubmit={handleSubmit('', handleChangeSubmit)}>
          <HTag className={styles.formTitle} size="l">{titles[changeOption].title}</HTag>
	          {
							templates[changeOption]
	          }
          <Button type="submit">{titles[changeOption].button}</Button>
        </form>
      </Card>
    );
};