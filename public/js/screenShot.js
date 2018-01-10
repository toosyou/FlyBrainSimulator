/** @namespace */
var THREEx	= THREEx 		|| {};


(function(){

    /**
     * Take a screenshot of a renderer
     * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
     * - TODO is it possible to check if this variable is set ? if so check it
     *   and make advice in the console.log
     *   - maybe with direct access to the gl context...
     *
     * @param {Object} renderer to use
     * @param {String} mimetype of the output image. default to "image/png"
     * @param {String} dataUrl of the image
     */
    var toDataURL	= function(renderer, mimetype)
    {
        mimetype	= mimetype	|| "image/png";
        var dataUrl	= renderer.domElement.toDataURL(mimetype);
        return dataUrl;
    }

    /**
     * resize an image to another resolution while preserving aspect
     *
     * @param {String} srcUrl the url of the image to resize
     * @param {Number} dstWidth the destination width of the image
     * @param {Number} dstHeight the destination height of the image
     * @param {Number} callback the callback to notify once completed with callback(newImageUrl)
     */
    var _aspectResize	= function(srcUrl, dstW, dstH, callback){

        var cpuScaleAspect	= function(maxW, maxH, curW, curH){
            var ratio	= curH / curW;
            if( curW >= maxW && ratio <= 1 ){
                curW	= maxW;
                curH	= maxW * ratio;
            }else if(curH >= maxH){
                curH	= maxH;
                curW	= maxH / ratio;
            }
            return { width: curW, height: curH };
        }


        var onLoad	= function(){

            var canvas	= document.createElement('canvas');
            canvas.width	= dstW;	canvas.height	= dstH;
            var ctx		= canvas.getContext('2d');

            ctx.fillStyle	= "gray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            var scaled	= cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);
            console.log(scaled);

            var offsetX	= (canvas.width  - scaled.width )/2;
            var offsetY	= (canvas.height - scaled.height)/2;
            ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

            var mimetype	= "image/png";
            var newDataUrl	= canvas.toDataURL(mimetype);

            callback && callback(newDataUrl)
        }.bind(this);

        var image 	= new Image();
        image.onload	= onLoad;
        image.src	= srcUrl;
    }

    /**
     * Bind a key to renderer screenshot
     */
    var bindKey	= function(renderer, opts){
        opts		= opts		|| {};
        opts.charCode	= opts.charCode	|| 'p'.charCodeAt(0);
        opts.width	= opts.width	|| 1920;
        opts.height	= opts.height	|| 1080;
        opts.callback	= opts.callback	|| function(url){
                window.open(url);
            };

        var dataUrl	= this.toDataURL(renderer);
        _aspectResize(dataUrl, opts.width, opts.height, opts.callback);
        return true;
    }

    THREEx.Screenshot	= {
        toDataURL	: toDataURL,
        bindKey		: bindKey
    };
})();
