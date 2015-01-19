<!DOCTYPE html>
<html lang="zh_CN">
	<head>
		<title>all cards</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="viewport"
		content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
		<script src="<?=base_url()?>/Public/js/jslib/utils.js"></script>
		<script src="<?=base_url()?>Public/js/jslib/jquery2x.js"></script>
		<style>
		</style>
	</head>
	<style>
	</style>
	<body>
		<?php echo form_open_multipart('sys/card_console/upload'); ?>
		<input type="file" name="userfile" size="20" />

		<br />
		<br />

		<input type="submit" value="upload" />
		</form>
	</body>
	<script src="<?=base_url()?>/Public/js/cards/cardConfigObjList.js"></script>
	<script></script>
</html>