/*
  iTunes �� COM

  �O���[�v����ɂȂ��Ă�g���b�N�𖄂߂�
  �g���b�N���A�A�[�e�B�X�g�A�A���o���A�g���b�N�ԍ�����v���鑼��
  �g���b�N����R�s�[���Ė��߂�X�N���v�g

*/

var	iTunesApp = WScript.CreateObject("iTunes.Application");
var	mainLibrary = iTunesApp.LibraryPlaylist;

main(WScript.Arguments);

function main(args) {
	var doFill = false;
	
	for (var j=0; j<args.length; j++) {
		if (args(j) == '-x') {
			doFill = true;
		}
	}

	fillGroup(doFill);

	if (!doFill) {
		WScript.Echo("\n�܂����������Ă��܂���B\n" +
			"����������Ƃ��� -x ��t���ċN���B\n" +
			"�K���o�b�N�A�b�v���Ƃ��Ă���B");
	}
}

function fillGroup(doFill)
{
	var tracks = mainLibrary.Tracks;

	for (var j=1; j<tracks.Count; j++) {
		var track = tracks.Item(j);

		// �O���[�v����̂��̂�T��
		if (track.Grouping == "") {
			// ��̂��̂���������A�g���b�N���A�A�[�e�B�X�g�A�A���o���A�g���b�N�ԍ���v����
			// ���̃t�@�C������R�s�[���Ă���
			var matched = mainLibrary.Search(track.Name, 5); // �g���b�N���ōi�荞��

			// �����Ώۂ̃g���b�N����\��
			//WScript.Echo(track.Name + " " + (matched.Count-1));

			for (var k=1; k<matched.Count; k++) {
				var x = matched.Item(k);
				if (track.Name == x.Name && track.Artist == x.Artist
						&& track.Album == x.Album && track.TrackNumber == x.TrackNumber
						&& x.Grouping != "") {
					WScript.Echo(x.Name + " => " + x.Grouping);
					if (doFill) {
						WScript.Echo("�����ς���");
					}
					break;
				}
			}
		}
	}
}


function test2() {

	tracks = mainLibrary.Search("�J�[�{�[�C", 0);

	for (var j=1; j<tracks.Count; j++) {
			var track = tracks.Item(j);
			track.Grouping = "TTTBBBSSS";
			WScript.Echo(track.Name  + " / " + track.Album+ " by " + track.Artist + " # " + track.Grouping);
	}
}

function test1()
{
	// "mp3" �v���C���X�g
	var playlist = iTunesApp.LibrarySource.PlayLists.ItemByName("mp3");
	var tracks = playlist.Tracks;

	for (var j=1; j<tracks.Count; j++) {
		var track = tracks.Item(j);
		t
		WScript.Echo(track.Name  + " / " + track.Album+ " by " + track.Artist + " # " + track.Grouping);
	}
}