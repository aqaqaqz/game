import win32api, win32con, time, random, win32gui

monitor = 0

spacebar = [1650, 850, 50]	#스페이스바
fail	 = [1100, 900, 0]	#실패, 괴수
treasure = [900, 725, 20]	#보물상자, 정령 touch

keepBtn	 	= [1360, 925, 0]	#낚시계속버튼
menuBtn	 	= [1500, 100, 5]	#메뉴버튼
netBtn	 	= [1100, 200, 5]	#어망버튼
sellAllBtn	= [1750, 200, 3] 	#모두판매버튼
sellBtn		= [950, 750, 3]		#판매버튼
backBtn		= [1750, 90, 0]		#뒤로가기버튼

lifeBarPos 	= [740, 125]		#체력바
lifeBarColor = 13541			#낚시상태의 체력바 색상

randomRange = 3 	#메크로 방지 테스트(wait시 추가 대기시간 범위)

getFishCnt = 40		#잡을 물고기 숫자(정확하진 않음.)

def wait(t):
	return ['wait', t+random.random()*randomRange]

def click(x,y,r):
	x = int(x+random.random()*r) + monitor
	y = int(y+random.random()*r)
	
	if(lifeBarColor != getColor(lifeBarPos)):
		win32api.SetCursorPos((x,y))
		win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
		win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)
	else:
		while (lifeBarColor == getColor(lifeBarPos)):
			#낚시 끝날때까지 대기
			runOrder(wait(1))
			continue

def runOrder(order):
	if(order[0] == 'wait'):
		time.sleep(order[1])
	else:
		click(order[0], order[1], order[2])

def getColor(point):
	color = win32gui.GetPixel(win32gui.GetDC(win32gui.GetActiveWindow()), point[0]+monitor , point[1])
	return color

getFish = [
	spacebar,
	wait(2),
	treasure,
	fail,
	keepBtn
]

sellFish = [
	keepBtn,	#마지막 루프가 낚시버튼이면 낚시 종료 후 결과창이동 필요.
	wait(10),	#마지막 루프가 낚시버튼이면 낚시 종료 후 결과창이동 필요.
	fail,		#마지막 루프가 낚시버튼이며 낚시 실패한 경우
	treasure,	#마지막 루프가 낚시버튼이며 정령이나 상자나온 경우.
	wait(1),
	keepBtn,
	wait(15),	#만약 대기화면에서 keepBtn영역 눌리면 좃같은 거북이새끼 가끔 튀어나옴
	menuBtn,
	wait(1),
	netBtn,
	wait(1),
	sellAllBtn,
	wait(1),
	sellBtn,
	wait(1),
	backBtn,
	wait(1)
]

controll = [
	['loop', getFishCnt*4, getFish],#낚시 
	wait(30),						#마지막 루프가 낚시버튼이면 최소한 고기잡는 화면으로 이동시간 필요.
	['sellFish', sellFish],			#어망정리
	wait(random.random()*10+35) 	#10~35초의 대기시간(매크로방지가능한지 테스트 필요)
]

click(50, 150, 0)	#초기위치
while True:
	for order in controll:		
		if(order[0] == 'loop'):
			for i in range(order[1]):
				print(i)
				for orderDtl in order[2]:
					runOrder(orderDtl)
		elif(order[0] == 'wait'):
			runOrder(order)
		elif(order[0] == 'sellFish'):
			for orderDtl in order[1]:
				runOrder(orderDtl)
