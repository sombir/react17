import React, { useCallback, useState } from 'react';

import { Modal } from '@isf/fusion-common-ui/components/Modal/Modal';
import { Link } from 'carbon-components-react';

import { useI18n } from '../i18n/NlsUtility';

export const deepClone = <T,>(object: T) => {
  if (object) {
    return JSON.parse(JSON.stringify(object)) as T;
  }
  return object;
};

export const ErrorToastTimeout = 15000;

interface ToasterDetailPopupProps {
  title: string;
  subtitle: string;
  type: string;
  items?: string[];
}
export const ToasterDescriptionElement = ({ title, subtitle, type, items }: ToasterDetailPopupProps) => {
  const { t } = useI18n();
  const [openModel, setOpenModal] = useState(false);

  const closeModalHandler = useCallback(() => setOpenModal(false), []);
  const openModalHandler = useCallback(() => setOpenModal(true), []);
  const hasItems = items && items.length > 0;

  return (
    <>
      <div>
        <div>{subtitle}</div>
        {hasItems ? (
          <div className="viewMore">
            <Link onClick={openModalHandler}>{t('viewMore')}</Link>
          </div>
        ) : (
          <></>
        )}
      </div>
      <ToasterDetailModal isModalOpen={openModel} heading={title} type={type} items={items} onClose={closeModalHandler} />
    </>
  );
};

interface ToasterModalProps {
  isModalOpen: boolean | undefined;
  type: string;
  heading: string;
  items?: string[];
  onClose: () => void;
}

const ToasterDetailModal = ({ isModalOpen, type, heading, items, onClose }: ToasterModalProps) => {
  const { t } = useI18n();
  const hasItems = items && items.length > 0;

  return (
    <Modal
      className="errorModalPopup"
      size="sm"
      open={isModalOpen}
      modalHeading={heading}
      onRequestClose={onClose}
      preventCloseOnClickOutside={true}
      passiveModal>
      {hasItems &&
        items.map((item, idx) => {
          return (
            <div key={`${idx}`}>
              <div className="paddingBottom16">
                {type === 'inviteuser'
                  ? t('inviteFailedMessage', { email: item })
                  : type === 'updaterole'
                  ? t('editRolesFailedMessage', { email: item })
                  : type === 'removeuser'
                  ? t('deleteUserFailedMessage', { user: item })
                  : t('operationFailedMessage')}
              </div>
              <div className="paddingBottom8">{t('contactSupport')}</div>
              {items.length - 1 !== idx ? <hr className="errorModalHrTag" /> : <></>}
            </div>
          );
        })}
    </Modal>
  );
};
