'use strict';

// node_modules/hexo/lib/plugins/helper/list_tags.js

function listTagsHelper(tags, options) {
    if (!options && (!tags || !tags.hasOwnProperty('length'))) {
        options = tags;
        tags = this.site.tags;
    }

    if (!tags || !tags.length) return '';
    options = options || {};

    var style = options.hasOwnProperty('style') ? options.style : 'list';
    var showCount = options.hasOwnProperty('show_count') ? options.show_count : true;
    var className = options.class || 'tag';
    var orderby = options.orderby || 'name';
    var order = options.order || 1;
    var transform = options.transform;
    var suffix = options.suffix || '';
    var separator = options.hasOwnProperty('separator') ? options.separator : ', ';
    var result = '';
    var self = this;

    // Sort the tags
    //tags = tags.sort(orderby, order);

    if (order !== 0) {
        var tagList = tags.toArray();
        tagList = tagList.sort((x, y) => {
            const xx = x[orderby].toLowerCase();
            const yy = y[orderby].toLowerCase();
            let result = 0;

            if (xx < yy) {
                result = -1;
            } else if (xx > yy) {
                result = 1;
            }

            return (order > 0) ? result : -result;
        });
    }

    tags = tagList;

    // Ignore tags with zero posts
    tags = tags.filter(function (tag) {
        return tag.length;
    });

    // Limit the number of tags
    if (options.amount) tags = tags.limit(options.amount);

    if (style === 'list') {
        result += '<ul class="' + className + '-list">';

        tags.forEach(function (tag) {
            result += '<li class="' + className + '-list-item">';

            result += '<a class="' + className + '-list-link" href="' + self.url_for(tag.path) + suffix + '">';
            result += transform ? transform(tag.name) : tag.name;
            result += '</a>';

            if (showCount) {
                result += '<span class="' + className + '-list-count">' + tag.length + '</span>';
            }

            result += '</li>';
        });

        result += '</ul>';
    } else {
        tags.forEach(function (tag, i) {
            if (i) result += separator;

            result += '<a class="' + className + '-link" href="' + self.url_for(tag.path) + suffix + '">';
            result += transform ? transform(tag.name) : tag.name;

            if (showCount) {
                result += '<span class="' + className + '-count">' + tag.length + '</span>';
            }

            result += '</a>';
        });
    }

    return result;
}


hexo.extend.helper.register('list_tags2', listTagsHelper);
