import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { Box, Flex, IconButton, useDisclosure, VStack, HStack, Center, Button } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { getByDate } from '../../features/events/eventSlice';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const logoGrande = (
	<svg width='150' height='50' viewBox='0 0 505 175' fill='white' xmlns='http://www.w3.org/2000/svg'>
		<g clipPath='url(#clip0_31_843)'>
			<path
				d='M104.1 108.99C102.72 89.04 86.4399 72.96 66.4699 71.8C56.5499 71.22 47.3499 74.26 40.0799 79.71C37.5099 81.62 34.5199 82.97 31.3299 83.21C21.8599 83.93 16.4499 75.71 14.8299 72.76C14.5699 72.3 14.8999 71.73 15.4299 71.73H62.4299V64.54C62.4299 59.4 61.3899 54.27 59.0699 49.69C50.2699 32.3 30.1899 33.23 30.1899 33.23C11.8599 35.11 4.55995 46.06 1.64995 55.02C-1.05005 63.37 -0.420053 72.54 3.45995 80.42C11.1199 96.01 26.9699 96.61 26.9699 96.61C32.4899 96.91 38.1299 96.48 41.5399 95.34C48.9399 92.86 60.6099 81.15 75.3299 87.88C90.0399 94.62 90.2199 105.51 90.2199 105.51H24.4699C24.1399 107.57 23.9699 109.69 23.9699 111.85C23.9699 134.01 41.9299 151.97 64.0799 151.97C86.2299 151.97 105.72 132.44 104.1 108.99ZM31.9199 45.94C44.8099 46.67 47.8999 57.93 47.8999 57.93H14.1199C14.1199 57.93 19.0199 45.21 31.9199 45.94ZM64.0899 139.48C45.7599 140.02 39.5499 119.13 39.5499 119.13H90.5799C90.2199 122.59 82.4099 138.93 64.0899 139.48Z'
				fill='white'
			/>
			<path d='M100.65 54.58H69.73V65.48H100.65V54.58Z' fill='white' />
			<path d='M119.85 0H109.32V95.53H119.85V0Z' fill='white' />
			<path
				d='M188.677 69.861C188.895 68.4343 189 66.979 189 65.4952C189 49.202 175.788 36 159.495 36C143.202 36 130 49.202 130 65.4952C130 81.7885 143.202 95 159.495 95C167.875 95 175.437 91.5093 180.801 85.907L173.163 76.7664C173.163 76.7664 161.245 87.6191 150.878 80.124C150.878 80.124 144.315 77.1088 145.18 69.861H188.677ZM144.838 58.2189C144.838 58.2189 149.099 46.4151 160.342 47.1C171.565 47.7753 174.257 58.2189 174.257 58.2189H144.838Z'
				fill='white'
			/>
			<path
				d='M231.07 134.72C231.22 133.74 231.29 132.74 231.29 131.73C231.29 120.55 222.23 111.49 211.05 111.49C199.87 111.49 190.81 120.55 190.81 131.73C190.81 142.91 199.87 151.97 211.05 151.97C216.8 151.97 221.98 149.57 225.67 145.73L220.43 139.46C220.43 139.46 212.25 146.91 205.13 141.76C205.13 141.76 200.63 139.69 201.23 134.72H231.07ZM200.99 126.73C200.99 126.73 203.91 118.63 211.63 119.1C219.33 119.57 221.18 126.73 221.18 126.73H200.99Z'
				fill='white'
			/>
			<path
				d='M311.19 134.72C311.34 133.74 311.41 132.74 311.41 131.73C311.41 120.55 302.35 111.49 291.17 111.49C279.99 111.49 270.93 120.55 270.93 131.73C270.93 142.91 279.99 151.97 291.17 151.97C296.92 151.97 302.11 149.57 305.79 145.73L300.55 139.46C300.55 139.46 292.37 146.91 285.26 141.76C285.26 141.76 280.76 139.69 281.35 134.72H311.19ZM281.11 126.73C281.11 126.73 284.04 118.63 291.75 119.1C299.45 119.57 301.3 126.73 301.3 126.73H281.11Z'
				fill='white'
			/>
			<path
				d='M435.39 134.72C435.54 133.74 435.61 132.74 435.61 131.73C435.61 120.55 426.55 111.49 415.37 111.49C404.19 111.49 395.13 120.55 395.13 131.73C395.13 142.91 404.19 151.97 415.37 151.97C421.12 151.97 426.3 149.57 429.99 145.73L424.74 139.46C424.74 139.46 416.57 146.91 409.45 141.76C409.45 141.76 404.95 139.69 405.55 134.72H435.39ZM405.31 126.73C405.31 126.73 408.23 118.63 415.95 119.1C423.65 119.57 425.5 126.73 425.5 126.73H405.31Z'
				fill='white'
			/>
			<path
				d='M243 82.46V59.88C243 55.08 241.46 50.38 238.5 46.6C233.52 40.26 223.35 33.52 203.22 37.41L208.31 49.77C208.31 49.77 223.2 46.31 230.1 57.21C230.1 57.21 209.54 52.86 201.49 66C195.04 76.54 200.53 90.6 212.36 94.14C215.44 95.06 219.18 95.6 223.75 95.53H255.9V82.46H243ZM229.92 83H218.84C218.84 83 212.12 82.46 211.76 76.1C211.4 69.74 219.21 70.47 229.92 71.02V83Z'
				fill='white'
			/>
			<path
				d='M295.22 34.96V48.49C295.22 48.49 287.79 46.32 282.9 52.76C281.1 55.14 280.23 58.09 280.23 61.07V95.53H267.16V35.59H280.23V39.63C283.75 37.25 290.38 33.48 295.22 34.95V34.96Z'
				fill='white'
			/>
			<path
				d='M350.61 55.85V89.99C350.61 91.91 350.61 93.51 350.61 95.54H337.35C337.35 95.54 338.09 66.7 336.99 58.39C335.63 48.13 325.91 47.13 325.91 47.13C325.57 47.11 325.24 47.08 324.92 47.09C315.74 47.58 311.2 53.38 311.2 60.99V95.54H298.47C298.47 93.46 298.44 91.91 298.44 89.99V55.86C298.44 43.82 308.29 33.96 320.34 33.96H328.72C340.76 33.96 350.61 43.81 350.61 55.85Z'
				fill='white'
			/>
			<path
				d='M435.61 55.85V89.99C435.61 91.91 435.61 93.51 435.61 95.54H422.35C422.35 95.54 423.09 66.7 421.99 58.39C420.63 48.13 410.91 47.13 410.91 47.13C410.57 47.11 410.24 47.08 409.92 47.09C400.74 47.58 396.2 53.38 396.2 60.99V95.54H383.47C383.47 93.46 383.44 91.91 383.44 89.99V55.86C383.44 43.82 393.29 33.96 405.34 33.96H413.72C425.76 33.96 435.61 43.81 435.61 55.85Z'
				fill='white'
			/>
			<path d='M372.17 35.21H361.14V95.54H372.17V35.21Z' fill='white' />
			<path
				d='M366.66 29.44C370.797 29.44 374.15 25.6479 374.15 20.97C374.15 16.2921 370.797 12.5 366.66 12.5C362.523 12.5 359.17 16.2921 359.17 20.97C359.17 25.6479 362.523 29.44 366.66 29.44Z'
				fill='white'
			/>
			<path d='M268.03 110.83H259.64V151.97H268.03V110.83Z' fill='white' />
			<path
				d='M263.84 106.72C266.574 106.72 268.79 104.504 268.79 101.77C268.79 99.0362 266.574 96.82 263.84 96.82C261.106 96.82 258.89 99.0362 258.89 101.77C258.89 104.504 261.106 106.72 263.84 106.72Z'
				fill='white'
			/>
			<path
				d='M106.41 111.49L118.04 130.92L104.2 151.97H114.59L124.39 137.82L132.75 151.97H143.1L128.78 130.74L139.29 111.49H128.78L123.65 122.02L117.49 111.49H106.41Z'
				fill='white'
			/>
			<path
				d='M165.26 111.31C143.67 111.9 144.69 133.83 144.69 133.83V174.69H154.23V149.52C157.39 151.71 161.18 152.98 165.26 152.98C176.29 152.98 185.24 143.65 185.24 132.14C185.24 120.63 176.29 111.01 165.26 111.31ZM165.26 143.64C158.41 143.64 152.86 138.09 152.86 131.24C152.86 124.39 158.41 118.84 165.26 118.84C172.11 118.84 177.66 124.39 177.66 131.24C177.66 138.09 172.11 143.64 165.26 143.64Z'
				fill='white'
			/>
			<path
				d='M254.67 110.97V120.23C248.81 120.65 246.08 123.25 244.82 125.68V151.97H235.87V111.3H244.82V114.5C249.31 109.74 254.67 110.97 254.67 110.97Z'
				fill='white'
			/>
			<path
				d='M350.93 125.86V151.97H342.05V125.87C342.05 122.38 339.2 119.53 335.71 119.53H332.36C328.88 119.53 326.03 122.38 326.03 125.87V151.97H316.62V125.86C316.62 117.96 323.09 111.49 330.99 111.49H336.56C344.46 111.49 350.93 117.96 350.93 125.86Z'
				fill='white'
			/>
			<path
				d='M386.75 139.14L392.43 145.93C388.78 150.17 383.5 152.84 377.63 152.84C366.59 152.84 357.64 143.39 357.64 131.73C357.64 120.07 366.59 110.62 377.63 110.62C383.63 110.62 389.02 113.41 392.68 117.83L385.8 123.95C383.75 121.79 380.84 120.45 377.63 120.45C371.41 120.45 366.36 125.5 366.36 131.73C366.36 137.96 371.41 143.01 377.63 143.01C381.2 143.01 384.38 141.35 386.45 138.77L386.75 139.14Z'
				fill='white'
			/>
			<path
				d='M504.22 66.7C504.22 49.31 490.72 35.21 474.06 35.21C457.4 35.21 443.89 49.31 443.89 66.7C443.89 84.09 457.4 98.19 474.06 98.19C479.81 98.19 485.19 96.51 489.76 93.59C489.69 100.35 488.29 112.19 479.78 116.13C467.61 121.76 457.44 118.12 450.17 108.86L440.18 115.4C440.18 115.4 446.72 130.44 467.43 131.73C488.13 133.02 504.33 115.76 504.22 99.78C504.12 83.8 504.22 66.7 504.22 66.7ZM473.95 84.28C464.43 84.28 456.71 76.01 456.71 65.82C456.71 55.63 464.43 47.35 473.95 47.35C483.47 47.35 491.19 55.62 491.19 65.82C491.19 76.02 483.47 84.28 473.95 84.28Z'
				fill='white'
			/>
		</g>
		<defs>
			<clipPath id='clip0_31_843'>
				<rect width='504.22' height='174.69' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

const agenda = (
	<svg width='60' height='47' viewBox='0 0 60 47' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M23 5C22.4477 5 22 5.44772 22 6V20C22 20.5523 22.4477 21 23 21H37C37.5523 21 38 20.5523 38 20V6C38 5.44772 37.5523 5 37 5H23ZM20 6C20 4.34315 21.3431 3 23 3H37C38.6569 3 40 4.34315 40 6V20C40 21.6569 38.6569 23 37 23H23C21.3431 23 20 21.6569 20 20V6Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M34 1C34.5523 1 35 1.44772 35 2V6C35 6.55228 34.5523 7 34 7C33.4477 7 33 6.55228 33 6V2C33 1.44772 33.4477 1 34 1Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M26 1C26.5523 1 27 1.44772 27 2V6C27 6.55228 26.5523 7 26 7C25.4477 7 25 6.55228 25 6V2C25 1.44772 25.4477 1 26 1Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M20 10C20 9.44772 20.4477 9 21 9H39C39.5523 9 40 9.44772 40 10C40 10.5523 39.5523 11 39 11H21C20.4477 11 20 10.5523 20 10Z'
			fill='white'
		/>
		<path
			d='M2.64205 43H0.392045L4.48864 31.3636H7.09091L11.1932 43H8.94318L5.83523 33.75H5.74432L2.64205 43ZM2.71591 38.4375H8.85227V40.1307H2.71591V38.4375ZM16.1648 46.4545C15.4261 46.4545 14.7917 46.3542 14.2614 46.1534C13.7311 45.9564 13.3049 45.6913 12.983 45.358C12.661 45.0246 12.4375 44.6553 12.3125 44.25L14.1648 43.8011C14.2481 43.9716 14.3693 44.1402 14.5284 44.3068C14.6875 44.4773 14.9015 44.6174 15.1705 44.7273C15.4432 44.8409 15.786 44.8977 16.1989 44.8977C16.7822 44.8977 17.2652 44.7557 17.6477 44.4716C18.0303 44.1913 18.2216 43.7292 18.2216 43.0852V41.4318H18.1193C18.0133 41.6439 17.858 41.8617 17.6534 42.0852C17.4527 42.3087 17.1856 42.4962 16.8523 42.6477C16.5227 42.7992 16.108 42.875 15.608 42.875C14.9375 42.875 14.3295 42.7178 13.7841 42.4034C13.2424 42.0852 12.8106 41.6117 12.4886 40.983C12.1705 40.3504 12.0114 39.5587 12.0114 38.608C12.0114 37.6496 12.1705 36.8409 12.4886 36.1818C12.8106 35.5189 13.2443 35.017 13.7898 34.6761C14.3352 34.3314 14.9432 34.1591 15.6136 34.1591C16.125 34.1591 16.5455 34.2462 16.875 34.4205C17.2083 34.5909 17.4735 34.7973 17.6705 35.0398C17.8674 35.2784 18.017 35.5038 18.1193 35.7159H18.233V34.2727H20.2614V43.142C20.2614 43.8883 20.0833 44.5057 19.7273 44.9943C19.3712 45.483 18.8845 45.8485 18.267 46.0909C17.6496 46.3333 16.9489 46.4545 16.1648 46.4545ZM16.1818 41.2614C16.6174 41.2614 16.9886 41.1553 17.2955 40.9432C17.6023 40.7311 17.8352 40.4261 17.9943 40.0284C18.1534 39.6307 18.233 39.1534 18.233 38.5966C18.233 38.0473 18.1534 37.5663 17.9943 37.1534C17.839 36.7405 17.608 36.4205 17.3011 36.1932C16.9981 35.9621 16.625 35.8466 16.1818 35.8466C15.7235 35.8466 15.3409 35.9659 15.0341 36.2045C14.7273 36.4432 14.4962 36.7708 14.3409 37.1875C14.1856 37.6004 14.108 38.0701 14.108 38.5966C14.108 39.1307 14.1856 39.5985 14.3409 40C14.5 40.3977 14.733 40.7083 15.0398 40.9318C15.3504 41.1515 15.7311 41.2614 16.1818 41.2614ZM26.233 43.1705C25.358 43.1705 24.6023 42.9886 23.9659 42.625C23.3333 42.2576 22.8466 41.7386 22.5057 41.0682C22.1648 40.3939 21.9943 39.6004 21.9943 38.6875C21.9943 37.7898 22.1648 37.0019 22.5057 36.3239C22.8504 35.642 23.3314 35.1117 23.9489 34.733C24.5663 34.3504 25.2917 34.1591 26.125 34.1591C26.6629 34.1591 27.1705 34.2462 27.6477 34.4205C28.1288 34.5909 28.553 34.8561 28.9205 35.2159C29.2917 35.5758 29.5833 36.0341 29.7955 36.5909C30.0076 37.1439 30.1136 37.803 30.1136 38.5682V39.1989H22.9602V37.8125H28.142C28.1383 37.4186 28.053 37.0682 27.8864 36.7614C27.7197 36.4508 27.4867 36.2064 27.1875 36.0284C26.892 35.8504 26.5473 35.7614 26.1534 35.7614C25.733 35.7614 25.3636 35.8636 25.0455 36.0682C24.7273 36.2689 24.4792 36.5341 24.3011 36.8636C24.1269 37.1894 24.0379 37.5473 24.0341 37.9375V39.1477C24.0341 39.6553 24.1269 40.0909 24.3125 40.4545C24.4981 40.8144 24.7576 41.0909 25.0909 41.2841C25.4242 41.4735 25.8144 41.5682 26.2614 41.5682C26.5606 41.5682 26.8314 41.5265 27.0739 41.4432C27.3163 41.3561 27.5265 41.2292 27.7045 41.0625C27.8826 40.8958 28.017 40.6894 28.108 40.4432L30.0284 40.6591C29.9072 41.1667 29.6761 41.6098 29.3352 41.9886C28.9981 42.3636 28.5663 42.6553 28.0398 42.8636C27.5133 43.0682 26.911 43.1705 26.233 43.1705ZM33.9105 37.8864V43H31.8537V34.2727H33.8196V35.7557H33.9219C34.1226 35.267 34.4427 34.8788 34.8821 34.5909C35.3253 34.303 35.8726 34.1591 36.5241 34.1591C37.1264 34.1591 37.651 34.2879 38.098 34.5455C38.5488 34.803 38.8973 35.1761 39.1435 35.6648C39.3935 36.1534 39.5166 36.7462 39.5128 37.4432V43H37.456V37.7614C37.456 37.178 37.3045 36.7216 37.0014 36.392C36.7022 36.0625 36.2874 35.8977 35.7571 35.8977C35.3973 35.8977 35.0772 35.9773 34.7969 36.1364C34.5204 36.2917 34.3026 36.517 34.1435 36.8125C33.9882 37.108 33.9105 37.4659 33.9105 37.8864ZM44.8423 43.1534C44.1567 43.1534 43.5431 42.9773 43.0014 42.625C42.4598 42.2727 42.0317 41.7614 41.7173 41.0909C41.4029 40.4205 41.2457 39.6061 41.2457 38.6477C41.2457 37.678 41.4048 36.8598 41.723 36.1932C42.045 35.5227 42.4787 35.017 43.0241 34.6761C43.5696 34.3314 44.1776 34.1591 44.848 34.1591C45.3594 34.1591 45.7798 34.2462 46.1094 34.4205C46.4389 34.5909 46.7003 34.7973 46.8935 35.0398C47.0866 35.2784 47.2363 35.5038 47.3423 35.7159H47.4276V31.3636H49.4901V43H47.4673V41.625H47.3423C47.2363 41.8371 47.0829 42.0625 46.8821 42.3011C46.6813 42.536 46.4162 42.7367 46.0866 42.9034C45.7571 43.0701 45.3423 43.1534 44.8423 43.1534ZM45.4162 41.4659C45.8518 41.4659 46.223 41.3485 46.5298 41.1136C46.8366 40.875 47.0696 40.5436 47.2287 40.1193C47.3878 39.6951 47.4673 39.2008 47.4673 38.6364C47.4673 38.072 47.3878 37.5814 47.2287 37.1648C47.0734 36.7481 46.8423 36.4242 46.5355 36.1932C46.2325 35.9621 45.8594 35.8466 45.4162 35.8466C44.9579 35.8466 44.5753 35.9659 44.2685 36.2045C43.9616 36.4432 43.7306 36.7727 43.5753 37.1932C43.42 37.6136 43.3423 38.0947 43.3423 38.6364C43.3423 39.1818 43.42 39.6686 43.5753 40.0966C43.7344 40.5208 43.9673 40.8561 44.2741 41.1023C44.5848 41.3447 44.9654 41.4659 45.4162 41.4659ZM54.1932 43.1761C53.6402 43.1761 53.142 43.0777 52.6989 42.8807C52.2595 42.6799 51.911 42.3845 51.6534 41.9943C51.3996 41.6042 51.2727 41.1231 51.2727 40.5511C51.2727 40.0587 51.3636 39.6515 51.5455 39.3295C51.7273 39.0076 51.9754 38.75 52.2898 38.5568C52.6042 38.3636 52.9583 38.2178 53.3523 38.1193C53.75 38.017 54.161 37.9432 54.5852 37.8977C55.0966 37.8447 55.5114 37.7973 55.8295 37.7557C56.1477 37.7102 56.3788 37.642 56.5227 37.5511C56.6705 37.4564 56.7443 37.3106 56.7443 37.1136V37.0795C56.7443 36.6515 56.6174 36.3201 56.3636 36.0852C56.1098 35.8504 55.7443 35.733 55.267 35.733C54.7633 35.733 54.3636 35.8428 54.0682 36.0625C53.7765 36.2822 53.5795 36.5417 53.4773 36.8409L51.5568 36.5682C51.7083 36.0379 51.9583 35.5947 52.3068 35.2386C52.6553 34.8788 53.0814 34.6098 53.5852 34.4318C54.089 34.25 54.6458 34.1591 55.2557 34.1591C55.6761 34.1591 56.0947 34.2083 56.5114 34.3068C56.928 34.4053 57.3087 34.5682 57.6534 34.7955C57.9981 35.0189 58.2746 35.3239 58.483 35.7102C58.6951 36.0966 58.8011 36.5795 58.8011 37.1591V43H56.8239V41.8011H56.7557C56.6307 42.0436 56.4545 42.2708 56.2273 42.483C56.0038 42.6913 55.7216 42.8598 55.3807 42.9886C55.0436 43.1136 54.6477 43.1761 54.1932 43.1761ZM54.7273 41.6648C55.1402 41.6648 55.4981 41.5833 55.8011 41.4205C56.1042 41.2538 56.3371 41.0341 56.5 40.7614C56.6667 40.4886 56.75 40.1913 56.75 39.8693V38.8409C56.6856 38.8939 56.5758 38.9432 56.4205 38.9886C56.2689 39.0341 56.0985 39.0739 55.9091 39.108C55.7197 39.142 55.5322 39.1723 55.3466 39.1989C55.161 39.2254 55 39.2481 54.8636 39.267C54.5568 39.3087 54.2822 39.3769 54.0398 39.4716C53.7973 39.5663 53.6061 39.6989 53.4659 39.8693C53.3258 40.036 53.2557 40.2519 53.2557 40.517C53.2557 40.8958 53.3939 41.1818 53.6705 41.375C53.947 41.5682 54.2992 41.6648 54.7273 41.6648Z'
			fill='white'
		/>
	</svg>
);

const panel = (
	<svg width='43' height='47' viewBox='0 0 43 47' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M11.5 3C11.5 2.44772 11.9477 2 12.5 2H19.5C20.0523 2 20.5 2.44772 20.5 3V10C20.5 10.5523 20.0523 11 19.5 11H12.5C11.9477 11 11.5 10.5523 11.5 10V3ZM13.5 4V9H18.5V4H13.5Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M22.5 3C22.5 2.44772 22.9477 2 23.5 2H30.5C31.0523 2 31.5 2.44772 31.5 3V10C31.5 10.5523 31.0523 11 30.5 11H23.5C22.9477 11 22.5 10.5523 22.5 10V3ZM24.5 4V9H29.5V4H24.5Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M22.5 14C22.5 13.4477 22.9477 13 23.5 13H30.5C31.0523 13 31.5 13.4477 31.5 14V21C31.5 21.5523 31.0523 22 30.5 22H23.5C22.9477 22 22.5 21.5523 22.5 21V14ZM24.5 15V20H29.5V15H24.5Z'
			fill='white'
		/>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M11.5 14C11.5 13.4477 11.9477 13 12.5 13H19.5C20.0523 13 20.5 13.4477 20.5 14V21C20.5 21.5523 20.0523 22 19.5 22H12.5C11.9477 22 11.5 21.5523 11.5 21V14ZM13.5 15V20H18.5V15H13.5Z'
			fill='white'
		/>
		<path
			d='M1.14773 43V31.3636H5.51136C6.4053 31.3636 7.1553 31.5303 7.76136 31.8636C8.37121 32.197 8.83144 32.6553 9.14205 33.2386C9.45644 33.8182 9.61364 34.4773 9.61364 35.2159C9.61364 35.9621 9.45644 36.625 9.14205 37.2045C8.82765 37.7841 8.36364 38.2405 7.75 38.5739C7.13636 38.9034 6.38068 39.0682 5.48295 39.0682H2.59091V37.3352H5.19886C5.72159 37.3352 6.14962 37.2443 6.48295 37.0625C6.81629 36.8807 7.0625 36.6307 7.22159 36.3125C7.38447 35.9943 7.46591 35.6288 7.46591 35.2159C7.46591 34.803 7.38447 34.4394 7.22159 34.125C7.0625 33.8106 6.81439 33.5663 6.47727 33.392C6.14394 33.214 5.71402 33.125 5.1875 33.125H3.25568V43H1.14773ZM13.7088 43.1761C13.1558 43.1761 12.6577 43.0777 12.2145 42.8807C11.7751 42.6799 11.4266 42.3845 11.169 41.9943C10.9152 41.6042 10.7884 41.1231 10.7884 40.5511C10.7884 40.0587 10.8793 39.6515 11.0611 39.3295C11.2429 39.0076 11.491 38.75 11.8054 38.5568C12.1198 38.3636 12.474 38.2178 12.8679 38.1193C13.2656 38.017 13.6766 37.9432 14.1009 37.8977C14.6122 37.8447 15.027 37.7973 15.3452 37.7557C15.6634 37.7102 15.8944 37.642 16.0384 37.5511C16.1861 37.4564 16.2599 37.3106 16.2599 37.1136V37.0795C16.2599 36.6515 16.133 36.3201 15.8793 36.0852C15.6255 35.8504 15.2599 35.733 14.7827 35.733C14.2789 35.733 13.8793 35.8428 13.5838 36.0625C13.2921 36.2822 13.0952 36.5417 12.9929 36.8409L11.0724 36.5682C11.224 36.0379 11.474 35.5947 11.8224 35.2386C12.1709 34.8788 12.5971 34.6098 13.1009 34.4318C13.6046 34.25 14.1615 34.1591 14.7713 34.1591C15.1918 34.1591 15.6103 34.2083 16.027 34.3068C16.4437 34.4053 16.8243 34.5682 17.169 34.7955C17.5137 35.0189 17.7902 35.3239 17.9986 35.7102C18.2107 36.0966 18.3168 36.5795 18.3168 37.1591V43H16.3395V41.8011H16.2713C16.1463 42.0436 15.9702 42.2708 15.7429 42.483C15.5194 42.6913 15.2372 42.8598 14.8963 42.9886C14.5592 43.1136 14.1634 43.1761 13.7088 43.1761ZM14.2429 41.6648C14.6558 41.6648 15.0137 41.5833 15.3168 41.4205C15.6198 41.2538 15.8527 41.0341 16.0156 40.7614C16.1823 40.4886 16.2656 40.1913 16.2656 39.8693V38.8409C16.2012 38.8939 16.0914 38.9432 15.9361 38.9886C15.7846 39.0341 15.6141 39.0739 15.4247 39.108C15.2353 39.142 15.0478 39.1723 14.8622 39.1989C14.6766 39.2254 14.5156 39.2481 14.3793 39.267C14.0724 39.3087 13.7978 39.3769 13.5554 39.4716C13.313 39.5663 13.1217 39.6989 12.9815 39.8693C12.8414 40.036 12.7713 40.2519 12.7713 40.517C12.7713 40.8958 12.9096 41.1818 13.1861 41.375C13.4626 41.5682 13.8149 41.6648 14.2429 41.6648ZM22.4418 37.8864V43H20.3849V34.2727H22.3509V35.7557H22.4531C22.6539 35.267 22.974 34.8788 23.4134 34.5909C23.8565 34.303 24.4039 34.1591 25.0554 34.1591C25.6577 34.1591 26.1823 34.2879 26.6293 34.5455C27.08 34.803 27.4285 35.1761 27.6747 35.6648C27.9247 36.1534 28.0478 36.7462 28.044 37.4432V43H25.9872V37.7614C25.9872 37.178 25.8357 36.7216 25.5327 36.392C25.2334 36.0625 24.8187 35.8977 24.2884 35.8977C23.9285 35.8977 23.6084 35.9773 23.3281 36.1364C23.0516 36.2917 22.8338 36.517 22.6747 36.8125C22.5194 37.108 22.4418 37.4659 22.4418 37.8864ZM33.9986 43.1705C33.1236 43.1705 32.3679 42.9886 31.7315 42.625C31.099 42.2576 30.6122 41.7386 30.2713 41.0682C29.9304 40.3939 29.7599 39.6004 29.7599 38.6875C29.7599 37.7898 29.9304 37.0019 30.2713 36.3239C30.616 35.642 31.0971 35.1117 31.7145 34.733C32.3319 34.3504 33.0573 34.1591 33.8906 34.1591C34.4285 34.1591 34.9361 34.2462 35.4134 34.4205C35.8944 34.5909 36.3187 34.8561 36.6861 35.2159C37.0573 35.5758 37.349 36.0341 37.5611 36.5909C37.7732 37.1439 37.8793 37.803 37.8793 38.5682V39.1989H30.7259V37.8125H35.9077C35.9039 37.4186 35.8187 37.0682 35.652 36.7614C35.4853 36.4508 35.2524 36.2064 34.9531 36.0284C34.6577 35.8504 34.313 35.7614 33.919 35.7614C33.4986 35.7614 33.1293 35.8636 32.8111 36.0682C32.4929 36.2689 32.2448 36.5341 32.0668 36.8636C31.8925 37.1894 31.8035 37.5473 31.7997 37.9375V39.1477C31.7997 39.6553 31.8925 40.0909 32.0781 40.4545C32.2637 40.8144 32.5232 41.0909 32.8565 41.2841C33.1899 41.4735 33.58 41.5682 34.027 41.5682C34.3262 41.5682 34.5971 41.5265 34.8395 41.4432C35.0819 41.3561 35.2921 41.2292 35.4702 41.0625C35.6482 40.8958 35.7827 40.6894 35.8736 40.4432L37.794 40.6591C37.6728 41.1667 37.4418 41.6098 37.1009 41.9886C36.7637 42.3636 36.3319 42.6553 35.8054 42.8636C35.2789 43.0682 34.6766 43.1705 33.9986 43.1705ZM41.6761 31.3636V43H39.6193V31.3636H41.6761Z'
			fill='white'
		/>
	</svg>
);

const logo = (
	<svg width='29' height='33' viewBox='0 0 29 33' fill='white' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M28.9737 21.0569C28.5896 15.5133 24.0584 11.0451 18.5001 10.7228C15.739 10.5616 13.1783 11.4063 11.1548 12.9208C10.4395 13.4515 9.60731 13.8266 8.71943 13.8933C6.08361 14.0934 4.57782 11.8093 4.12692 10.9895C4.05456 10.8617 4.14641 10.7033 4.29392 10.7033H17.3756V8.70539C17.3756 7.27711 17.0861 5.85161 16.4404 4.57894C13.9911 -0.253305 8.40212 0.00234053 8.40212 0.00234053C3.30027 0.527524 1.26844 3.57026 0.458488 6.06002C-0.293012 8.38027 -0.117662 10.9284 0.962272 13.118C3.09431 17.4501 7.50589 17.6168 7.50589 17.6168C9.04229 17.7002 10.6121 17.5807 11.5612 17.2639C13.6209 16.5748 16.869 13.3209 20.9661 15.191C25.0604 17.0639 25.1105 20.0899 25.1105 20.0899H6.81006C6.71821 20.6623 6.67089 21.2514 6.67089 21.8517C6.67089 28.0094 11.6698 33 17.8348 33C23.9999 33 29.4247 27.5731 28.9737 21.0569ZM8.88364 3.53691C12.4714 3.73976 13.3314 6.86863 13.3314 6.86863H3.92931C3.92931 6.86863 5.29314 3.33406 8.88364 3.53691ZM17.8376 29.5293C12.7358 29.6794 11.0073 23.8746 11.0073 23.8746H25.2107C25.1105 24.836 22.9367 29.3765 17.8376 29.5293Z'
			fill='white'
		/>
	</svg>
);

const profile = (
	<svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M16.5 9C16.5 10.1935 16.0259 11.3381 15.182 12.182C14.3381 13.0259 13.1935 13.5 12 13.5C10.8065 13.5 9.66193 13.0259 8.81802 12.182C7.97411 11.3381 7.5 10.1935 7.5 9C7.5 7.80653 7.97411 6.66193 8.81802 5.81802C9.66193 4.97411 10.8065 4.5 12 4.5C13.1935 4.5 14.3381 4.97411 15.182 5.81802C16.0259 6.66193 16.5 7.80653 16.5 9Z" fill="#FBFBFB"/>
	<path fill-rule="evenodd" clip-rule="evenodd" d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM12 1.5C10.0227 1.50011 8.08555 2.05854 6.4116 3.11104C4.73766 4.16354 3.39492 5.66732 2.53795 7.44929C1.68097 9.23127 1.34458 11.219 1.5675 13.1837C1.79042 15.1485 2.56358 17.0103 3.798 18.555C4.863 16.839 7.2075 15 12 15C16.7925 15 19.1355 16.8375 20.202 18.555C21.4364 17.0103 22.2096 15.1485 22.4325 13.1837C22.6554 11.219 22.319 9.23127 21.4621 7.44929C20.6051 5.66732 19.2623 4.16354 17.5884 3.11104C15.9145 2.05854 13.9773 1.50011 12 1.5Z" fill="#FBFBFB"/>
	<path d="M33.6775 5.01074L31 7.68241L28.3225 5.01074L27.5 5.83324L31 9.33324L34.5 5.83324L33.6775 5.01074Z" fill="#FBFBFB"/>
	</svg>
	)


	const Header = () => {
		const { isOpen, onToggle, onClose } = useDisclosure();
		const user = useSelector((state) => state.auth.user);
		const dispatch = useDispatch();
		const navigate = useNavigate()

		useEffect(() => {
			dispatch(getByDate('2025-06-25'));
		},[])
	
		const handleLogout = () => {
			console.log('Logging out handle')
			dispatch(logout())
			navigate('/login')

		}

	
		
		return (
			<Box position='fixed' top='0' width='100%' bg='primary.50' px={4} height='72px' backgroundColor='#191919' zIndex='1000'>
				<Box display='grid' gridTemplateColumns='1fr 1fr 1fr' alignItems='center' height='100%'>
					<Box className='burgerIcon' display={{ base: 'flex', md: 'none' }} alignItems='center' justifyContent='flex-start' gridColumn='1' height='100%'>
						<IconButton
							size='md'
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label='Toggle Navigation'
							onClick={onToggle}
							color='secondary.white'
							background='none'
							_hover={{ background: 'none' }}
							_active={{ background: 'none' }}
						/>
					</Box>
	
					<Box className='logoGrande' display={{ base: 'none', md: 'flex' }} gridColumn='1' alignItems='center' justifyContent='start' height='100%' onClick={onToggle}>
						{logoGrande}
					</Box>
	
					<Center gridColumn='2' display={{ base: 'flex', md: 'none' }} justifyContent='center' alignItems='center' height='100%'>
						<Link to='/'>{logo}</Link>
					</Center>
	
					<Center gridColumn='2' display={{ base: 'none', md: 'flex' }} justifyContent='center' alignItems='center' height='100%'>
						{user?.rol === 'admin' && (
							<Box className='iconsAdmin' justifyContent='center'>
								<HStack spacing={8}>
									<Link to='/adminscheduleview'>
										<Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
											{agenda}
										</Box>
									</Link>
									<Link to='/paneladmin'>
										<Box display='flex' flexDirection='column' alignItems='center'>
											{panel}
										</Box>
									</Link>
								</HStack>
							</Box>
						)}
					</Center>
					
					<Box className='userInfo' display={{base:'none', md:'flex'}} justifyContent='flex-end' alignItems='center' gridColumn='3'>
						<Box>
						<Menu>
          <MenuButton
            as={Button}
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
          >
            {profile}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
						</Box>
					</Box>
				</Box>
	
				{isOpen && (
					<Box className='menulist' position='fixed' top='0' left='0' width={{ base: '70%', md: '25%' }} height='100vh' bg='#191919' zIndex='overlay' pb={4}>
						<Flex justifyContent='flex-end' p={4}>
							<IconButton
								icon={<CloseIcon />}
								aria-label='Close Menu'
								onClick={onClose}
								color='secondary.white'
								background='none'
								_hover={{ background: 'none' }}
								_active={{ background: 'none' }}
							/>
						</Flex>
						<VStack as='nav' spacing={'4'} mt={'4'}>
							<Button variant="unstyled" width="90%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
								INICIO
							</Button>
							<Link to='/schedule' style={{ width: '90%' }}>
								<Button
									variant="unstyled"
									width="100%"
									fontSize="16px"
									borderRadius="10px"
									color="white"
									_hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}
								>
									PROGRAMACION
								</Button>
							</Link>
							<Link to='/users' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
									PONENTES
								</Button>
							</Link>
							<Link to='https://www.elearningexperience.es/premio-digit-e-learning/' target='blank' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
									PREMIOS DIGIT
								</Button>
							</Link>
							<Link to='https://www.elearningexperience.es/alojamiento/' target='blank' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
									ALOJAMIENTO
								</Button>
							</Link>
							<Link to='/' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
									OTRAS EDICIONES
								</Button>
							</Link>
							<Link to='/' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" borderRadius="10px" color="white" _hover={{ color: '#0F8BA0', border: '1px solid white', borderRadius: '10px' }}>
									CONTACTO
								</Button>
							</Link>
							<Link to='/login' style={{ width: '90%' }}>
								<Button variant="unstyled" width="100%" fontSize="16px" position='relative'bottom='0' borderRadius="80px" bg='#0F8BA0' color="white" marginTop='150px'>
									Iniciar sesion
								</Button>
							</Link>
							{!user && (
								<>
									<Link to='/login' style={{ color: 'white' }}>
										Login
									</Link>
									<Link to='/register' style={{ color: 'white' }}>
										Register
									</Link>
								</>
							)}
						</VStack>
					</Box>
				)}
			</Box>
		);
	};
	
	export default Header;
	