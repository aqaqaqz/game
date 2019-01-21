#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

class Solution {
	vector<int> ori;
	unordered_map<int, int> m;
	int getBoardType(vector<int> &board) {
		int type = 0;
		for (int i = 0; i < 9; i++) {
			type *= 10;
			type += board[i];
		}
		return type;
	}
	void changeBoard(vector<int> &board, int p1, int p2) {
		int temp = board[p1];
		board[p1] = board[p2];
		board[p2] = temp;
	}
public:
	Solution(vector<int> _v) { ori = _v; }
	int getMinValue(vector<int> &board) {
		int type = getBoardType(board);
		if (type == 12345678) return 0;
		if (m[type]) return m[type];

		int temp = 1000000;
		for (int i = 0; i < 9; i++) {
			if (board[i] == i) continue;
			int pos = board[i];
			changeBoard(board, i, pos);
			temp = min(temp, getMinValue(board) + 2);
			changeBoard(board, i, pos);
		}
		m[type] = temp;

		return m[type];
	}
	void getMinPath(int val, vector<int> &path) {
		vector<int> board = ori;
		int type = getBoardType(board);
		while (type != 12345678) {
			for (int i = 0; i < 9; i++) {
				if (board[i] == i) continue;
				int pos = board[i];
				changeBoard(board, i, pos);
				
				if (m[type] == val) {
					path.push_back(i);
					type = getBoardType(board);
					val = m[type];
					break;
				}
				changeBoard(board, i, pos);
			}
			
		}
	}

};

void main() {
	vector<int> v(9);
	for (int i = 0; i < 9; i++) cin >> v[i];
	for (int i = 0; i < 9; i++) v[i]--;

	Solution s(v);
	int minVal = s.getMinValue(v);
	cout << "총 필요 에너지 : " << minVal << endl;

	cout << "경로 : ";
	vector<int> path;
	s.getMinPath(minVal, path);
	for (int n : path) cout << n+1 << " ";
	cout << endl;
}