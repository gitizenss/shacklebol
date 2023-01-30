import type { SpriteProps } from "@glideapps/glide-data-grid/dist/ts/common/utils";
import type { CustomIcon } from "@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-sprites";
import { customColors } from "@local/design-system";

export const customGridIcons: Record<
  CustomIcon,
  (props: SpriteProps) => string
> = {
  bpAsteriskCircle: ({ fgColor }) =>
    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0C3.11719 0 0 3.14453 0 7C0 10.8828 3.11719 14 7 14C10.8555 14 14 10.8828 14 7C14 3.14453 10.8555 0 7 0ZM7 12.6875C3.85547 12.6875 1.3125 10.1445 1.3125 7C1.3125 3.88281 3.85547 1.3125 7 1.3125C10.1172 1.3125 12.6875 3.88281 12.6875 7C12.6875 10.1445 10.1172 12.6875 7 12.6875Z" fill="${fgColor}"/><path d="M10.0156 8.75C9.92188 8.92188 9.75 9 9.57812 9C9.48438 9 9.40625 8.98438 9.32812 8.9375L7.5 7.875V10C7.5 10.2812 7.26562 10.5 7 10.5C6.75 10.5 6.5 10.2812 6.5 10V7.875L4.64062 8.9375C4.5625 8.98438 4.48438 9 4.39062 9C4.21875 9 4.04688 8.92188 3.96875 8.75C3.82812 8.51562 3.90625 8.21875 4.14062 8.07812L5.98438 7L4.14062 5.9375C3.90625 5.79688 3.82812 5.5 3.95312 5.25C4.0625 5.07812 4.26562 4.98438 4.45312 5.01562C4.51562 5.01562 4.57812 5.04688 4.64062 5.07812L6.5 6.14062V4C6.5 3.73438 6.71875 3.5 7 3.5C7.26562 3.5 7.5 3.73438 7.5 4V6.14062L9.34375 5.07812C9.40625 5.04688 9.46875 5.01562 9.53125 5.01562C9.71875 4.98438 9.92188 5.07812 10.0156 5.25C10.1406 5.5 10.0625 5.79688 9.82812 5.9375L8 7L9.84375 8.07812C10.0781 8.21875 10.1562 8.51562 10.0156 8.75Z" fill="${fgColor}"/></svg>`,
  bpError: () =>
    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0C3.11719 0 0 3.14453 0 7C0 10.8828 3.11719 14 7 14C10.8555 14 14 10.8828 14 7C14 3.14453 10.8555 0 7 0ZM7 12.6875C3.85547 12.6875 1.3125 10.1445 1.3125 7C1.3125 3.88281 3.85547 1.3125 7 1.3125C10.1172 1.3125 12.6875 3.88281 12.6875 7C12.6875 10.1445 10.1172 12.6875 7 12.6875ZM7 8.3125C7.35547 8.3125 7.65625 8.03906 7.65625 7.65625V4.15625C7.65625 3.80078 7.35547 3.5 7 3.5C6.61719 3.5 6.34375 3.80078 6.34375 4.15625V7.65625C6.34375 8.03906 6.61719 8.3125 7 8.3125ZM7 9.24219C6.50781 9.24219 6.125 9.625 6.125 10.0898C6.125 10.5547 6.50781 10.9375 7 10.9375C7.46484 10.9375 7.84766 10.5547 7.84766 10.0898C7.84766 9.625 7.46484 9.24219 7 9.24219Z" fill="${customColors.red[70]}"/></svg>`,
  bpLabel: ({ fgColor }) =>
    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0C3.11719 0 0 3.14453 0 7C0 10.8828 3.11719 14 7 14C10.8555 14 14 10.8828 14 7C14 3.14453 10.8555 0 7 0ZM7 12.6875C3.85547 12.6875 1.3125 10.1445 1.3125 7C1.3125 3.88281 3.85547 1.3125 7 1.3125C10.1172 1.3125 12.6875 3.88281 12.6875 7C12.6875 10.1445 10.1172 12.6875 7 12.6875Z" fill="${fgColor}"/><path d="M4.5 3.5H6.82812C7.09375 3.5 7.34375 3.60938 7.53125 3.79688L10.2812 6.54688C10.6719 6.9375 10.6719 7.57812 10.2812 7.96875L8.20312 10.0469C7.8125 10.4375 7.17188 10.4375 6.78125 10.0469L4.03125 7.29688C3.84375 7.10938 3.75 6.85938 3.75 6.59375V4.25C3.75 3.84375 4.07812 3.5 4.5 3.5ZM5.5 5.75C5.76562 5.75 6 5.53125 6 5.25C6 4.98438 5.76562 4.75 5.5 4.75C5.21875 4.75 5 4.98438 5 5.25C5 5.53125 5.21875 5.75 5.5 5.75Z" fill="${fgColor}"/></svg>`,
  bpAsterisk: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.95 12C14.7915 12.2746 14.5036 12.4286 14.2068 12.4286C14.0617 12.4286 13.9144 12.3918 13.7793 12.3136L8.91072 9.48571V15.1429C8.91072 15.6161 8.52679 16 8.08572 16C7.64465 16 7.19643 15.6179 7.19643 15.1429V9.48571L2.29643 12.315C2.16072 12.3607 2.01357 12.4286 1.86822 12.4286C1.57136 12.4286 1.28357 12.2746 1.125 12C0.888396 11.5904 1.02904 11.0657 1.43861 10.8293L6.33929 8L1.43929 5.17071C1.02893 4.93571 0.888575 4.41071 1.09286 4C1.36036 3.59286 1.885 3.44643 2.29572 3.68571L7.19643 6.51429V0.857143C7.19643 0.383929 7.58215 0 8.05357 0C8.525 0 8.91072 0.383929 8.91072 0.857143V6.51429L13.8107 3.685C14.225 3.44643 14.7464 3.59286 14.95 4C15.1866 4.40964 15.046 4.93429 14.6364 5.17071L9.73572 8L14.6357 10.8293C15.0786 11.0643 15.2179 11.5893 14.95 12Z" fill="${fgColor}"/></svg>`,
  bpChevronDown: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7243 4.27748C16.0919 4.64745 16.0919 5.24729 15.7243 5.61726L8.66551 12.7225C8.29796 13.0925 7.70204 13.0925 7.33449 12.7225L0.275663 5.61726C-0.0918894 5.24729 -0.0918894 4.64745 0.275663 4.27748C0.643215 3.90751 1.23914 3.90751 1.60669 4.27748L8 10.7129L14.3933 4.27748C14.7609 3.90751 15.3568 3.90751 15.7243 4.27748Z" fill="${fgColor}" /></svg>`,
  bpChevronRight: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.27748 0.275664C4.64745 -0.0918881 5.24729 -0.0918881 5.61726 0.275664L12.7225 7.33449C13.0925 7.70204 13.0925 8.29796 12.7225 8.66551L5.61726 15.7243C5.24729 16.0919 4.64745 16.0919 4.27748 15.7243C3.90751 15.3568 3.90751 14.7609 4.27748 14.3933L10.7129 8L4.27748 1.60669C3.90751 1.23914 3.90751 0.643216 4.27748 0.275664Z" fill="${fgColor}"/></svg>`,
  bpCheck: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2656 4.26562L6.76562 12.7656C6.64062 12.9219 6.45312 12.9844 6.26562 12.9844C6.04688 12.9844 5.85938 12.9219 5.73438 12.7656L1.23438 8.26562C0.921875 7.98438 0.921875 7.51562 1.23438 7.23438C1.51562 6.92188 1.98438 6.92188 2.26562 7.23438L6.26562 11.2031L14.2344 3.23438C14.5156 2.92188 14.9844 2.92188 15.2656 3.23438C15.5781 3.51562 15.5781 3.98438 15.2656 4.26562Z" fill="${fgColor}"/></svg>`,
  bpCross: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7656 11.7344C13.0469 12.0469 13.0469 12.5156 12.7656 12.7969C12.4531 13.1094 11.9844 13.1094 11.7031 12.7969L8.01562 9.07812L4.29688 12.7969C3.98438 13.1094 3.51562 13.1094 3.23438 12.7969C2.92188 12.5156 2.92188 12.0469 3.23438 11.7344L6.95312 8.01562L3.23438 4.29688C2.92188 3.98438 2.92188 3.51562 3.23438 3.23438C3.51562 2.92188 3.98438 2.92188 4.26562 3.23438L8.01562 6.98438L11.7344 3.26562C12.0156 2.95312 12.4844 2.95312 12.7656 3.26562C13.0781 3.54688 13.0781 4.01562 12.7656 4.32812L9.04688 8.01562L12.7656 11.7344Z" fill="${fgColor}"/></svg>`,
  bpList: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.75 1.5C3.15625 1.5 3.5 1.84375 3.5 2.25V3.75C3.5 4.1875 3.15625 4.5 2.75 4.5H1.25C0.8125 4.5 0.5 4.1875 0.5 3.75V2.25C0.5 1.84375 0.8125 1.5 1.25 1.5H2.75ZM15.25 2.25C15.6562 2.25 16 2.59375 16 3C16 3.4375 15.6562 3.75 15.25 3.75H5.75C5.3125 3.75 5 3.4375 5 3C5 2.59375 5.3125 2.25 5.75 2.25H15.25ZM15.25 7.25C15.6562 7.25 16 7.59375 16 8C16 8.4375 15.6562 8.75 15.25 8.75H5.75C5.3125 8.75 5 8.4375 5 8C5 7.59375 5.3125 7.25 5.75 7.25H15.25ZM15.25 12.25C15.6562 12.25 16 12.5938 16 13C16 13.4375 15.6562 13.75 15.25 13.75H5.75C5.3125 13.75 5 13.4375 5 13C5 12.5938 5.3125 12.25 5.75 12.25H15.25ZM0.5 7.25C0.5 6.84375 0.8125 6.5 1.25 6.5H2.75C3.15625 6.5 3.5 6.84375 3.5 7.25V8.75C3.5 9.1875 3.15625 9.5 2.75 9.5H1.25C0.8125 9.5 0.5 9.1875 0.5 8.75V7.25ZM2.75 11.5C3.15625 11.5 3.5 11.8438 3.5 12.25V13.75C3.5 14.1875 3.15625 14.5 2.75 14.5H1.25C0.8125 14.5 0.5 14.1875 0.5 13.75V12.25C0.5 11.8438 0.8125 11.5 1.25 11.5H2.75Z" fill="${fgColor}"/></svg>`,
  bpLink: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.925 2.98702C14.25 2.32979 13.375 2.00117 12.475 2.00117C11.525 1.9777 10.575 2.30632 9.875 2.98702L8.425 4.30147C8.775 4.48925 9.125 4.70051 9.425 4.9587L10.7 3.78508C11.15 3.3391 11.775 3.10438 12.4 3.10438C13 3.10438 13.625 3.3391 14.075 3.78508C15.025 4.65356 15.025 6.08538 14.075 6.95386L11.25 9.60625C10.35 10.4747 8.775 10.4747 7.875 9.60625C7.4 9.18374 7.15 8.62041 7.15 8.03359C7.15 7.61109 7.275 7.21206 7.5 6.88344C7.225 6.62525 6.825 6.48441 6.425 6.48441C6.4 6.48441 6.375 6.48441 6.375 6.48441C6.1 6.95386 5.95 7.47026 5.95 8.01012C5.95 8.92555 6.325 9.77056 7.025 10.4043C7.7 11.0381 8.6 11.3902 9.55 11.3902C10.525 11.3902 11.425 11.0615 12.1 10.4043L14.925 7.75193C15.625 7.0947 15.975 6.22622 16 5.35773C16 4.48925 15.625 3.64425 14.925 2.98702ZM5.275 12.2117C4.825 12.6342 4.2 12.8689 3.575 12.8689C2.975 12.8689 2.35 12.6342 1.9 12.2117C0.95 11.3197 0.95 9.88792 1.9 9.01944L4.725 6.36705C5.625 5.49857 7.2 5.49857 8.1 6.36705C8.575 6.78955 8.825 7.35289 8.825 7.96318C8.825 8.36221 8.7 8.76124 8.475 9.11333C8.75 9.34805 9.15 9.48889 9.55 9.48889C9.575 9.48889 9.6 9.48889 9.6 9.48889C9.875 9.01944 10.025 8.50304 10.025 7.96318C10.025 7.04775 9.65 6.20274 8.95 5.56899C8.275 4.93523 7.375 4.58314 6.425 4.58314C5.45 4.58314 4.55 4.93523 3.875 5.56899L1.05 8.24485C0.35 8.90208 0 9.77056 0 10.639C0 11.484 0.35 12.3525 1.05 13.0098C1.7 13.62 2.525 13.9721 3.4 13.9956C4.375 14.0425 5.375 13.7139 6.125 13.0098L7.55 11.6953C7.2 11.5075 6.85 11.2963 6.55 11.0381L5.275 12.2117Z" fill="${fgColor}"/></svg>`,
  bpTrash: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 2.5H11.9062L10.8438 0.75C10.5625 0.28125 10.0938 0 9.5625 0H6.40625C5.875 0 5.40625 0.28125 5.125 0.75L4.0625 2.5H1.71875C1.3125 2.5 1 2.84375 1 3.25C1 3.625 1.3125 4 1.71875 4H2L2.65625 14.5938C2.6875 15.4062 3.34375 16 4.15625 16H11.8125C12.625 16 13.2812 15.4062 13.3125 14.5938L14 4H14.25C14.6562 4 15 3.6875 15 3.25C15 2.84375 14.6562 2.5 14.25 2.5ZM6.40625 1.5H9.5625L10.1562 2.5H5.8125L6.40625 1.5ZM11.8125 14.5H4.15625L3.5 4H12.4688L11.8125 14.5Z" fill="${fgColor}"/></svg>`,
  bpRightLeft: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.01562 4.98733H10.9844V7.23733C10.9844 7.54983 11.1719 7.83108 11.4531 7.92483C11.7344 8.04983 12.0469 8.01858 12.2656 7.79983L15.7656 4.54983C16.0781 4.26858 16.0781 3.73733 15.7656 3.45608L12.2656 0.20608C12.0469 -0.0126696 11.7344 -0.0439196 11.4531 0.0498304C11.1719 0.17483 10.9844 0.45608 10.9844 0.73733V2.98733H1.01562C0.453125 2.98733 0.015625 3.45608 0.015625 3.98733C0.015625 4.48733 0.453125 4.98733 1.01562 4.98733ZM15.0156 10.9873H5.01562V8.73733C5.01562 8.42483 4.82812 8.14358 4.54688 8.04983C4.26562 7.95608 3.95312 7.98733 3.73438 8.20608L0.234375 11.4561C-0.078125 11.7373 -0.078125 12.2686 0.234375 12.5498L3.73438 15.7998C3.95312 16.0186 4.26562 16.0498 4.54688 15.9248C4.82812 15.8311 5.01562 15.5498 5.01562 15.2373V12.9873H15.0156C15.5469 12.9873 16.0156 12.5498 16.0156 11.9873C16.0156 11.4561 15.5469 10.9873 15.0156 10.9873Z" fill="${fgColor}"/></svg>`,
  bpTypeBoolean: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.56429 10.9929C7.175 11.3821 6.53929 11.3821 6.15 10.9929L3.86429 8.70714C3.47393 8.31786 3.47393 7.68214 3.86429 7.29286C4.25357 6.90357 4.88929 6.90357 5.27857 7.29286L6.85714 8.87143L10.7214 5.00714C11.1107 4.61786 11.7464 4.61786 12.1357 5.00714C12.525 5.39643 12.525 6.03214 12.1357 6.42143L7.56429 10.9929ZM0 2.28571C0 1.02321 1.02321 0 2.28571 0H13.7143C14.975 0 16 1.02321 16 2.28571V13.7143C16 14.975 14.975 16 13.7143 16H2.28571C1.02321 16 0 14.975 0 13.7143V2.28571ZM1.71429 2.28571V13.7143C1.71429 14.0286 1.97 14.2857 2.28571 14.2857H13.7143C14.0286 14.2857 14.2857 14.0286 14.2857 13.7143V2.28571C14.2857 1.97 14.0286 1.71429 13.7143 1.71429H2.28571C1.97 1.71429 1.71429 1.97 1.71429 2.28571Z" fill="${fgColor}"/></svg>`,
  bpTypeText: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0.857143V3.71429C16 4.21429 15.6071 4.57143 15.1429 4.57143C14.6429 4.57143 14.2857 4.21429 14.2857 3.71429V1.71429H8.85714V14.2857H10.5714C11.0357 14.2857 11.4286 14.6786 11.4286 15.1429C11.4286 15.6429 11.0357 16 10.5714 16H5.42857C4.92857 16 4.57143 15.6429 4.57143 15.1429C4.57143 14.6786 4.92857 14.2857 5.42857 14.2857H7.14286V1.71429H1.71429V3.71429C1.71429 4.21429 1.32143 4.57143 0.857143 4.57143C0.357143 4.57143 0 4.21429 0 3.71429V0.857143C0 0.392857 0.357143 0 0.857143 0H15.1429C15.6071 0 16 0.392857 16 0.857143Z" fill="${fgColor}"/></svg>`,
  bpTypeNumber: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.35736 3.12662C5.48246 1.93821 6.48322 1 7.7029 1C9.11022 1 10.2048 2.25095 10.0484 3.627L9.64187 7.41113C9.51678 8.59953 8.51602 9.50647 7.29634 9.50647C5.88902 9.50647 4.79444 8.28679 4.9508 6.91075L5.35736 3.12662ZM7.7029 2.50114C7.26507 2.50114 6.88978 2.84515 6.82723 3.28299L6.42067 7.06712C6.3894 7.5675 6.79596 8.00533 7.29634 8.00533C7.73417 8.00533 8.10946 7.69259 8.17201 7.25476L8.57856 3.47063C8.60984 2.97025 8.20328 2.50114 7.7029 2.50114ZM3.69985 1.15637C3.91877 1.31274 4.01259 1.5942 3.98132 1.84439L2.98056 9.85048C2.94928 10.257 2.574 10.5698 2.16744 10.5072C1.7296 10.476 1.44814 10.1007 1.51069 9.69412L2.32381 2.97025L1.29177 3.43936C0.916485 3.627 0.478652 3.43936 0.291009 3.06407C0.13464 2.68879 0.322283 2.25095 0.697568 2.09458L2.94928 1.09382C3.19947 0.968726 3.48094 1 3.69985 1.15637ZM15.8654 3.59573L15.6152 6.34782C15.5213 7.5675 14.4893 8.50571 13.2696 8.50571C11.8623 8.50571 10.799 7.34858 10.8928 5.94126L11.143 3.18917C11.2368 1.96949 12.2689 1 13.4886 1C14.8959 1 15.9592 2.1884 15.8654 3.59573ZM12.394 6.06636C12.3627 6.59801 12.7693 7.00457 13.2696 7.00457C13.7075 7.00457 14.0828 6.66056 14.1453 6.22272L14.3642 3.47063C14.3955 2.93898 13.9889 2.50114 13.4886 2.50114C13.0507 2.50114 12.6754 2.87643 12.6129 3.31426L12.394 6.06636ZM15.9905 10.1319C16.053 10.5385 15.8028 10.9451 15.3963 11.0076L0.885211 13.5095C0.478652 13.5721 0.0720923 13.3219 0.00954468 12.9153C-0.0530029 12.4775 0.197187 12.1022 0.603747 12.0397L15.1148 9.53775C15.5213 9.4752 15.9279 9.72539 15.9905 10.1319ZM6.85851 15.0107C6.45195 15.0732 6.07666 14.7917 6.01411 14.3852C5.95157 13.9786 6.20176 13.6033 6.63959 13.5408L14.1453 12.2898C14.5519 12.2273 14.9271 12.4775 14.9897 12.9153C15.0522 13.3219 14.8021 13.6972 14.3642 13.7597L6.85851 15.0107Z" fill="${fgColor}"/></svg>`,
  bpBracketsCurly: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.55556 2H3.33333C2.47417 2 1.77778 2.69639 1.77778 3.55556V5.70833C1.77778 6.00167 1.66119 6.28333 1.45361 6.49083L0.194444 7.75C0.0694444 7.875 0 8.04444 0 8.22222C0 8.39931 0.0694444 8.56944 0.194444 8.69444L1.45361 9.95361C1.66111 10.1611 1.77778 10.4417 1.77778 10.7361V12.8889C1.77778 13.7472 2.47417 14.4444 3.33333 14.4444H5.55556C5.925 14.4444 6.22222 14.1472 6.22222 13.7778C6.22222 13.4083 5.925 13.1111 5.55556 13.1111H3.33333C3.21111 13.1111 3.11111 13.0111 3.11111 12.8889V10.7361C3.11111 10.085 2.85175 9.46083 2.39028 9.00139L1.60778 8.22222L2.39056 7.44306C2.85278 6.98333 3.11111 6.35833 3.11111 5.70833V3.55556C3.11111 3.43333 3.21111 3.33333 3.33333 3.33333H5.55556C5.925 3.33333 6.22222 3.03472 6.22222 2.66667C6.22222 2.29861 5.925 2 5.55556 2ZM15.8056 7.75L14.5464 6.49083C14.3389 6.28333 14.2222 6.00278 14.2222 5.70833V3.55556C14.2222 2.69639 13.525 2 12.6667 2H10.4444C10.075 2 9.77778 2.29861 9.77778 2.64167C9.77778 2.98472 10.075 3.33333 10.4194 3.33333H12.6667C12.7889 3.33333 12.8889 3.43333 12.8889 3.55556V5.70833C12.8889 6.3575 13.1468 6.98 13.6058 7.43917L14.3639 8.22222L13.5808 9.00528C13.1472 9.46389 12.8889 10.0861 12.8889 10.7361V12.8889C12.8889 13.0111 12.7889 13.1111 12.6667 13.1111H10.4444C10.075 13.1111 9.77778 13.4083 9.77778 13.7528C9.77778 14.0972 10.075 14.4444 10.4194 14.4444H12.6667C13.5258 14.4444 14.2222 13.7481 14.2222 12.8889V10.7361C14.2222 10.4428 14.3388 10.1611 14.5464 9.95361L15.8056 8.69444C15.9306 8.56944 16 8.4 16 8.22222C16 8.04444 15.9306 7.875 15.8056 7.75Z" fill="${fgColor}"/></svg>`,
  bpBracketsSquare: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.28571 0H1.14286C0.514286 0 0 0.514286 0 1.14286V14.8571C0 15.4857 0.514286 16 1.14286 16H4.28571C4.76071 16 5.14286 15.6179 5.14286 15.1429C5.14286 14.6679 4.76071 14.2857 4.28571 14.2857H1.71429V1.71429H4.28571C4.76071 1.71429 5.14286 1.33036 5.14286 0.857143C5.14286 0.383929 4.76071 0 4.28571 0ZM14.8571 0H11.7143C11.2393 0 10.8571 0.383929 10.8571 0.825C10.8571 1.26607 11.2393 1.71429 11.6821 1.71429H14.2857V14.2857H11.7143C11.2393 14.2857 10.8571 14.6679 10.8571 15.1107C10.8571 15.5536 11.2393 16 11.6821 16H14.8571C15.4857 16 16 15.4857 16 14.8571V1.14286C16 0.514286 15.4857 0 14.8571 0Z" fill="${fgColor}"/></svg>`,
  bpEmptySet: ({ fgColor }) =>
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7532 0.219726C15.4602 -0.0732422 14.9857 -0.0732422 14.6925 0.219726L12.3616 2.55066C11.1875 1.58219 9.66253 1.00001 8.00004 1.00001C4.13441 1.00001 1.00004 4.13438 1.00004 8C1.00004 9.66282 1.58223 11.1875 2.55066 12.3875L0.219726 14.7184C-0.0732422 15.0114 -0.0732422 15.4859 0.219726 15.7791C0.366289 15.9281 0.557539 16 0.750039 16C0.942539 16 1.13379 15.9267 1.28035 15.7803L3.61129 13.4493C4.78441 14.4188 6.33754 15 8.00004 15C11.8657 15 15 11.8656 15 8C15 6.33719 14.4178 4.81251 13.4494 3.61251L15.7803 1.28157C16.0719 0.987195 16.0719 0.51282 15.7532 0.219726ZM2.50004 8C2.50004 4.96719 4.96722 2.50001 8.00004 2.50001C9.24628 2.50001 10.3935 2.92157 11.3157 3.62282L3.62191 11.3166C2.9216 10.3938 2.50004 9.24688 2.50004 8ZM13.5 8C13.5 11.0328 11.0328 13.5 8.00004 13.5C6.75379 13.5 5.6066 13.0784 4.68441 12.3772L12.3782 4.68344C13.0782 5.60625 13.5 6.75313 13.5 8Z" fill="${fgColor}"/></svg>`,
};
