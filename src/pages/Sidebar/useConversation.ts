import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { authenticationAtom } from './Authentication';
import { debounce } from 'lodash';

type TConversationRequest = {
  conversationId: string;
  customerId: string;
  accessToken: string;
  pageId: string;
};

type TConversationInfoResponse = {
  conversation_id: string;
  recent_phone_numbers: string[];
  global_user_id: string;
};

type TConversationInfo = {
  conversationId: string;
  recentPhoneNumbers: string[];
  globalUserId: string;
};

export const conversationRequestAtom = atom<TConversationRequest | null>(null);
export const conversationInfoAtom = atom<Promise<TConversationInfo | null>>(
  async (get) => {
    const conversationRequest = get(conversationRequestAtom);
    if (!conversationRequest) return null;

    const { conversationId, customerId, accessToken, pageId } =
      conversationRequest;
    console.log('fetching conversation info');
    return fetch(
      `https://pages.fm/api/v1/pages/${pageId}/conversations/${conversationId}/messages?customer_id=${customerId}&access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data: TConversationInfoResponse) => {
        return {
          conversationId: data.conversation_id,
          recentPhoneNumbers: data.recent_phone_numbers,
          globalUserId: data.global_user_id,
        } as TConversationInfo;
      });
  }
);

type TCustomer = {
  _id: string;
  customerId: string;
  cellphone: string;
  fullName: string;
};

type TComplaint = {
  _id: string;
  title: string;
};

export const customerAtom = atom<Promise<TCustomer | null>>(async (get) => {
  const conversationInfo = await get(conversationInfoAtom);
  if (!conversationInfo) return [];

  const recentPhoneNumbers = conversationInfo.recentPhoneNumbers;
  if (!recentPhoneNumbers || recentPhoneNumbers.length === 0) return [];

  console.log('fetching customer info');
  const response = await fetch(
    `https://work.4-handy.com/api/customers/search?searchText=${recentPhoneNumbers[0]}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data[0]) return null;
      console.log({ data });
      return data[0];
    });

  return response;
});

export const customerComplaintsAtom = atom<Promise<TComplaint[]>>(
  async (get) => {
    const customer = await get(customerAtom);
    if (!customer) return [];

    const customerId = customer._id;
    if (!customerId) return [];

    console.log('fetching customer complaints');

    const authentication = get(authenticationAtom);
    if (!authentication.loggedIn) return [];

    const response = await fetch(
      `https://work.4-handy.com/customers/api_v2/${customerId}/complaints`,
      {
        headers: {
          Authorization: `Bearer ${authentication?.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('complaints', data);
        return data;
      });

    return response;
  }
);

type Voucher = {
  _id: string;
  name: string;
  type: string;
  quantity: number;
  used: boolean;
  usedDate: string | null;
  startDate: string;
  expiryDate: string;
};

export const customerVouchersAtom = atom<Promise<Voucher[]>>(async (get) => {
  const customer = await get(customerAtom);
  if (!customer) return [];

  const customerId = customer._id;
  if (!customerId) return [];

  const authentication = get(authenticationAtom);
  if (!authentication.loggedIn) return [];

  console.log('fetching customer vouchers');
  const response = await fetch(
    `https://work.4-handy.com/customers/api_v2/${customerId}/vouchers`,
    {
      headers: {
        Authorization: `Bearer ${authentication?.token}`,
      },
    }
  ).then((res) => res.json());

  console.log('vouchers', response);

  return response;
});

export const unsedVouchersAtom = atom<Promise<Voucher[]>>(async (get) => {
  const vouchers = await get(customerVouchersAtom);
  if (!vouchers) return [];

  return vouchers.filter((voucher) => !voucher.used);
});
export const loadableUnusedVouchersAtom = loadable(unsedVouchersAtom);
export const loadableCustomerVouchersAtom = loadable(customerVouchersAtom);
export const loadableCustomerComplaintsAtom = loadable(customerComplaintsAtom);
export const loadableConversationInfo = loadable(conversationInfoAtom);
export const loadableCustomerAtom = loadable(customerAtom);

export const useConversation = () => {
  const [conversation, setConversation] = useAtom(conversationRequestAtom);

  useEffect(() => {
    console.log('ADD EVENT LISTENER');
    chrome.runtime.onMessage.addListener(
      debounce((message, sender, sendResponse) => {
        sendResponse({ success: true });
        console.log('message', message, 'sender', sender);
        if (message.type === 'GET_RECENT_ORDERS') {
          setConversation(message.data as TConversationRequest);
          return true;
        }
      }, 200)
    );
  }, [setConversation]);

  return {
    conversation,
  };
};
