import { Fragment } from "react";
import { Button, Card, Divider, Grid, Input } from "antd-mobile";
import Head from "next/head";
import { Fragment } from "react";
import style from "./styles.module.css";
import logo from "../../../public/images/logo-mobi.png";
import Image from "next/image";

function LobbyRoom() {
  return (
    <Fragment>
      <Head>
        <title>Meeting | Mobile</title>
      </Head>
      <div className={style.header_lobby}>
        <Grid columns={20} className={style.grid_header_custom}>
          <Grid.Item span={6}>
            <Image src={logo} fit="contain" alt="" />
          </Grid.Item>
        </Grid>
      </div>
      <Divider className={style.devider_custom} />
      <div className={style.content_custom}>
        <Card
          className={style.card_custom}
          bodyClassName={style.card_body_custom}
        >
          <Grid columns={100}>
            <Grid.Item span={40} className={style.label_custom}>
              <span className={style.label_custom_text}>Mã phòng : </span>
            </Grid.Item>
            <Grid.Item span={60} className={style.label_custom}>
              <Input placeholder="Nhập mã phòng" />
            </Grid.Item>
          </Grid>
          <div className={`${style.flex_custom} ${style.mt_30}`}>
            <Button size="small" color="primary">
              Tham gia
            </Button>
          </div>
        </Card>
      </div>
    </Fragment>
  );
}
export default LobbyRoom;
