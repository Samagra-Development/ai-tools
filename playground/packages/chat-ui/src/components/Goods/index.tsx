import React from 'react';
import clsx from 'clsx';
import { Flex, FlexItem } from '../Flex';
import { Text } from '../Text';
import { Price } from '../Price';
import { Tag } from '../Tag';
import { IconButton, IconButtonProps } from '../IconButton';
import { Button, ButtonProps } from '../Button';

type TagProps = {
  name: string;
};

export type GoodsRef = HTMLDivElement;

export interface GoodsProps extends React.HTMLAttributes<GoodsRef> {
  className?: string;
  type?: 'goods' | 'order';
  img?: string;
  name: string;
  desc?: React.ReactNode;
  tags?: TagProps[];
  locale?: string;
  currency?: string;
  price?: number;
  originalPrice?: number;
  meta?: React.ReactNode;
  count?: number;
  unit?: string;
  status?: string;
  action?: ButtonProps | IconButtonProps;
  children?: React.ReactNode;
}

export const Goods = React.forwardRef<GoodsRef, GoodsProps>((props, ref) => {
  const {
    // 通用
    className,
    type,
    img,
    name,
    desc,
    tags = [],
    locale,
    currency,
    price,
    count,
    unit,
    action,
    children,

    // 商品
    originalPrice,
    meta,

    // 订单
    status,
    ...other
  } = props;

  const isOrder = type === 'order';

  const infos = (
    <>
      <Text as="h4" truncate={isOrder ? 2 : true} className="Goods-name">
        {name}
      </Text>
      <Text className="Goods-desc">{desc}</Text>
      <div className="Goods-tags">
        {tags.map((t) => (
          <Tag color="primary" key={t.name}>
            {t.name}
          </Tag>
        ))}
      </div>
    </>
  );

  const priceProps = { currency, locale };
  const priceCont = price != null && <Price price={price} {...priceProps} />;

  const countUnit = (
    <div className="Goods-countUnit">
      {count && (
        <span className="Goods-count">
          &times;
          {count}
        </span>
      )}
      {unit && <span className="Goods-unit">{unit}</span>}
    </div>
  );

  const mainCont = isOrder ? (
    infos
  ) : (
    <>
      {action && <IconButton className="Goods-buyBtn" icon="cart" {...action} />}
      {infos}
      <Flex alignItems="flex-end">
        <FlexItem>
          {priceCont}
          {originalPrice && <Price price={originalPrice} original {...priceProps} />}
          {meta && <span className="Goods-meta">{meta}</span>}
        </FlexItem>
        {countUnit}
      </Flex>
    </>
  );

  return (
    <Flex className={clsx('Goods', className)} data-type={type} ref={ref} {...other}>
      {img && <img className="Goods-img" src={img} alt={name} />}
      <FlexItem className="Goods-main">
        {mainCont}
        {children}
      </FlexItem>
      {isOrder && (
        <div className="Goods-aside">
          {priceCont}
          {countUnit}
          <span className="Goods-status">{status}</span>
          {action && <Button className="Goods-detailBtn" {...action} />}
        </div>
      )}
    </Flex>
  );
});
