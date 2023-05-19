import React from 'react';
import {
  useListenMessage,
  conversationRequestAtom,
  loadableConversationInfo,
  loadableCustomerAtom,
  loadableCustomerComplaintsAtom,
  loadableCustomerVouchersAtom,
  loadableOnlineOrdersAtom,
  loadableMostRecentReceiverCustomer,
} from './stores';
import { useAtomValue } from 'jotai';
import { Price } from './Price';
import {
  Anchor,
  Badge,
  Card,
  CheckIcon,
  Divider,
  List,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from '@mantine/core';
import { DateTime } from './DateTime';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { OnlineOrderStatus } from './OnlineOrderStatus';

export const CustomerInfo: React.FC = () => {
  useListenMessage();
  const conversation = useAtomValue(conversationRequestAtom);
  const conversationInfo = useAtomValue(loadableConversationInfo);
  const customerInfo = useAtomValue(loadableCustomerAtom);
  const complaints = useAtomValue(loadableCustomerComplaintsAtom);
  const vouchers = useAtomValue(loadableCustomerVouchersAtom);
  const onlineOrders = useAtomValue(loadableOnlineOrdersAtom);
  const mostRecentReceiverCustomer = useAtomValue(
    loadableMostRecentReceiverCustomer
  );

  const hasCustomerInfo =
    customerInfo.state === 'hasData' && customerInfo.data?._id;

  return (
    <Stack>
      {/* <Group>
        <HoverCard>
          <HoverCard.Target>
            <Text>Conversation ID</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text>{conversation?.conversationId}</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard>
          <HoverCard.Target>
            <Text>Customer ID</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text>{conversation?.customerId}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group> */}

      <Title order={2}>
        {!hasCustomerInfo && 'Customer Info'}
        {hasCustomerInfo && customerInfo.data?.fullName}
      </Title>

      <Text>
        Điện thoại:{' '}
        {conversationInfo.state === 'loading'
          ? 'Loading...'
          : conversationInfo.state === 'hasData'
          ? conversationInfo.data?.recentPhoneNumbers.join(', ')
          : 'Error'}
      </Text>

      {customerInfo.state === 'loading' && <Loader />}
      {customerInfo.state === 'hasData' && !customerInfo.data?._id && (
        <Text>No Customer Data</Text>
      )}
      {customerInfo.state === 'hasData' && customerInfo.data?._id && (
        <Stack>
          <Stack>
            <Title order={3}>Complaints</Title>
            {complaints.state === 'hasData' && complaints.data.length > 0 && (
              <Timeline>
                {complaints.data.map((complaint) => (
                  <Timeline.Item
                    key={complaint._id}
                    title={
                      <Anchor
                        href={`https://work.4-handy.com/#!/complaints/${complaint._id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {complaint.title}
                      </Anchor>
                    }
                    bullet={
                      complaint.status === 'done' ? (
                        <CheckIcon></CheckIcon>
                      ) : undefined
                    }
                  >
                    <Text>
                      <DateTime inpuDate={complaint.created}></DateTime>
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            )}
            {complaints.state === 'hasData' && complaints.data.length === 0 && (
              <Text>No complaints</Text>
            )}
            {complaints.state === 'loading' && <Loader />}
          </Stack>

          <Stack>
            <Title order={3}>Vouchers</Title>
            {vouchers.state === 'hasData' && vouchers.data.length > 0 && (
              <List
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconCircleDashed />
                  </ThemeIcon>
                }
              >
                {vouchers.data.map((voucher) => (
                  <List.Item
                    key={voucher._id}
                    icon={
                      voucher.used ? (
                        <ThemeIcon color="teal" size={24} radius="xl">
                          <IconCircleCheck />
                        </ThemeIcon>
                      ) : undefined
                    }
                  >
                    <Anchor
                      href={`https://work.4-handy.com/#!/vouchers/${voucher._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {voucher.name} - <Price value={voucher.quantity} />
                    </Anchor>
                  </List.Item>
                ))}
              </List>
            )}
            {vouchers.state === 'hasData' && vouchers.data.length === 0 && (
              <Text>No vouchers</Text>
            )}
            {complaints.state === 'loading' && <Loader />}
          </Stack>

          <Stack>
            <Title order={3}>Online Orders</Title>
            {onlineOrders.state === 'hasData' &&
              onlineOrders.data.length > 0 && (
                <Timeline>
                  {onlineOrders.data.map((onlineOrder) => (
                    <Timeline.Item
                      key={onlineOrder._id}
                      title={
                        <>
                          <OnlineOrderStatus status={onlineOrder.status} />{' '}
                          <Badge>
                            <Anchor
                              href={`https://work.4-handy.com/#!/online-orders/${onlineOrder._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {onlineOrder.onlineOrderId}
                            </Anchor>
                          </Badge>{' '}
                        </>
                      }
                    >
                      <Text weight={800}>
                        <Price value={onlineOrder.orderValue} />
                      </Text>
                      {/* <DateTime inpuDate={onlineOrder.created}></DateTime> */}
                    </Timeline.Item>
                  ))}
                </Timeline>
              )}
            {onlineOrders.state === 'hasData' &&
              onlineOrders.data.length === 0 && <Text>No voucher</Text>}
            {onlineOrders.state === 'loading' && <Loader />}
          </Stack>

          <Stack>
            <Title order={3}>Last Address</Title>
            {mostRecentReceiverCustomer.state === 'hasData' && (
              <Card shadow="sm" withBorder>
                <Text>Người nhận: {mostRecentReceiverCustomer.data?.name}</Text>
                <Text>
                  Điện thoại: {mostRecentReceiverCustomer.data?.cellphone}
                </Text>
                <Text>Địa chỉ: {mostRecentReceiverCustomer.data?.address}</Text>
              </Card>
            )}
            {mostRecentReceiverCustomer.state === 'loading' && <Loader />}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
